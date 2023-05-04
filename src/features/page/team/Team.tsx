import React, { useEffect, memo, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Action from '../../../redux/action/memberAction/action';
import { IGeneralState, IMember, ISelectOption } from '../../../interface/interface';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { BsSearch } from 'react-icons/bs';
import { Input, Select } from 'antd';
import defaultAVT from '../../../asset/picture/defaultAVT.jpg';
import { handleSortByBranch, handleSortByPotion } from '../../../utils/sortUser';
import { memberPosition, memberType, optionMemberPosition, positionOption } from '../../../constants/constants';
import { getAllBranchFilter, getUserNotPagging } from '../../../service/apiService';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

const Team = (): JSX.Element => {
  const dispatch = useDispatch();
  const { memberList, memberSelected, allBranchFilter } = useSelector(
    (state: IGeneralState) => state.memberReducer);
  const { projectInfo } = useSelector(
    (state: IGeneralState) => state.projectReducer);
  const allBranch = 0;
  const [showDeactive, setShowDeactive] = useState(false);
  const [rightList, setRightList] = useState<IMember[]>([]);
  const [leftList, setLeftList] = useState<IMember[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchMemberValue, setSearchMemberValue] = useState({ memberList: '', memberSelected: '' });
  const [currentBranch, setCurrentBranch] = useState(allBranch);
  const [currentPosition, setCurrentPosition] = useState('all');
  console.log('memberList', memberList.length);
  console.log('memberSelected', memberSelected.length);
  useEffect(() => {
    const getUserAndBranch = async (): Promise<void> => {
      try {
        const resOfBranch = await getAllBranchFilter();
        const resOfUser = await getUserNotPagging();
        dispatch(Action.updateAllBranchFilter(resOfBranch?.data?.result));
        dispatch(Action.setMemberListAction(resOfUser?.data?.result));
        if (location.pathname.includes('edit') && projectInfo.users.length > 0) {
          dispatch(Action.editMemberSelected(projectInfo.users));
        }
      } catch (error) {
        const errorMessage = isAxiosError(error)
          ? error.message
          : 'Some thing went wrong, try later';
        toast.error(errorMessage);
      }
    };
    void getUserAndBranch();
  }, []);

  useEffect(() => {
    setRightList(memberList);
    const memIncludeDeactive = memberSelected;
    const memNotIncludeDeactive = memberSelected.filter((memSel) => memSel.type !== 3);
    if (showDeactive) {
      setLeftList(memIncludeDeactive);
    } else {
      setLeftList(memNotIncludeDeactive);
    }
  }, [memberList, showDeactive, memberSelected]);

  const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = e.target;
      setSearchMemberValue({ ...searchMemberValue, [name]: value });
      if (value.length === 0) {
        if (name !== 'memberList') {
          setLeftList(memberSelected);
        }
      }
    }, [searchMemberValue.memberList, searchMemberValue.memberSelected]);

  const handleUpdateMemberType = (option: ISelectOption, member: IMember): void => {
    const memberTypeUpdated = { ...member, type: Number(option.value) };
    dispatch(Action.memberUpdateTypeAction(memberTypeUpdated));
  };

  const handelSearchMember = useCallback(
    (searchValue: string, filterList: IMember[]): IMember[] => {
      if (searchValue.length > 0) {
        const searchResult = filterList.filter((member) =>
          member.name.toLowerCase().includes(searchValue.toLowerCase()));
        return searchResult;
      } else {
        return filterList;
      }
    }, [isSearch]);

  useEffect(() => {
    const sortByBranchList = handleSortByBranch(currentBranch, memberList);
    const sortByPositionList = handleSortByPotion(currentPosition, sortByBranchList);
    const listResult = handelSearchMember(searchMemberValue.memberList, sortByPositionList);
    setRightList(listResult);
  }, [currentBranch, currentPosition, isSearch]);

  const handleShowDeactive = (): void => {
    setShowDeactive(!showDeactive);
  };

  const branchOption = allBranchFilter.map((branch) => ({
    value: branch.id,
    label: branch.displayName
  }));

  return (
    <div className='flex justify-around mt-2 flex-wrap'>
      <div className='w-full lg:w-1/2'>
        <h4 className='m-0 pt-2 pl-3'>Team</h4>
        <div className='flex justify-between gap-10 mt-6 mb-4'>
          <div className='flex justify-start gap-2 items-center ml-3'>
            <input
              className='w-4 h-4'
              type="checkbox"
              name=""
              id="showDeactive"
              checked={showDeactive}
              onChange={handleShowDeactive}
            />
            <label
              className='cursor-pointer select-none'
              htmlFor='showDeactive'
            >
              Show deactive member
            </label>
          </div>
          <Input
            className='w-1/2 mr-4'
            placeholder="Search by name, email"
            prefix={<BsSearch />}
            name='memberSelected'
            onChange={(e) => handleSearchInputChange(e)}
            onPressEnter={() => setLeftList(
              handelSearchMember(searchMemberValue.memberSelected, memberSelected)
            )}
          />
        </div>
        <div className='flex gap-3 flex-col h-96 overflow-y-scroll px-3'>
          {
            leftList.length > 0 &&
            leftList.map((member) => {
              return (
                <div key={member.id} className='flex h-16 py-3 bg-gray-200
                rounded justify-between items-center px-4'>
                  <div className='flex justify-start gap-4 items-center'>
                    <IoIosArrowForward
                      className='text-lg h-12 w-6 hover:scale-150 hover:cursor-pointer
                       hover:text-green-550 transition-all duration-300'
                      onClick={() => dispatch(Action.memberRemovedAction(member))}
                    />
                    <div className='flex justify-start items-center gap-2'>
                      <img src={defaultAVT} className='w-8 h-8 rounded-full' alt="" />
                      <div className='flex flex-col w-160px truncate'>
                        <div>
                          <span className='mr-3 truncate'><b>{member.name}</b></span>
                        </div>
                        <span className='text-sm truncate'>{member.emailAddress}</span>
                      </div>
                    </div>
                    {member.level !== null &&
                      <span className='bg-red-500 text-white text-xs rounded-lg px-2 pb-2px font-medium mr-1'>
                        {memberPosition[member.level]}
                      </span>
                    }
                  </div>
                  <Select
                    defaultValue={member.type !== null
                      ? optionMemberPosition.find((option) =>
                        option.value === member.type.toString())
                      : optionMemberPosition[0]}
                    labelInValue
                    className='w-24 lg:w-36'
                    onChange={(option) => handleUpdateMemberType(option, member)}
                    options={optionMemberPosition}
                  />
                </div>
              );
            })
          }
        </div>
      </div>
      <div className='w-full lg:w-1/2 px-3 shadow-lg rounded '>
        <div className='flex justify-start gap-1 items-center cursor-pointer' >
          <h4 className='m-0 pb-2'>Select team member</h4>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex flex-start gap-10 mt-6 mb-4'>
            <div className='flex relative'>
              <label className='absolute -top-6 text-sm left-0'>Branch:</label>
              <Select
                defaultValue={{ value: 0, label: 'All' }}
                labelInValue
                style={{ width: 120 }}
                onChange={(option) => setCurrentBranch(option.value)}
                options={branchOption}
              />
            </div>
          </div>
          <div className='flex flex-start gap-10 mt-6 mb-4'>
            <div className='flex relative'>
              <label className='absolute -top-6 text-sm left-0'>Type:</label>
              <Select
                defaultValue={{ value: '-1', label: 'All' }}
                labelInValue
                style={{ width: 120 }}
                onChange={(option) => setCurrentPosition(option.value)}
                options={positionOption}
              />
            </div>
          </div>
          <div className='pr-4'>
            <Input
              placeholder="Search by name, email"
              prefix={<BsSearch />}
              name='memberList'
              onPressEnter={() => setIsSearch(!isSearch)}
              onChange={(e) => handleSearchInputChange(e)}
              value={searchMemberValue.memberList}
            />
          </div>
        </div>
        <div className='flex gap-3 flex-col w-full overflow-y-scroll pr-3 h-96'>
          {
            rightList.length > 0
              ? rightList.map((member) => {
                return (
                  (
                    <div
                      key={member.id}
                      className='flex h-16 py-3 bg-gray-200 rounded justify-between items-center px-4'
                    >
                      <div className='flex justify-start gap-3 items-center'>
                        <IoIosArrowBack
                          className='text-lg h-12 w-6 hover:scale-150 hover:cursor-pointer
                     hover:text-green-550 transition-all duration-300'
                          onClick={() => dispatch(Action.memberSelectedAction(member))}
                        />
                        <div className='flex justify-start items-center gap-5'>
                          <img src={defaultAVT} className='w-8 h-8 rounded-full' alt="" />
                          <div className='flex flex-col w-40 lg:w-64 truncate'>
                            <span><b>{member.name}</b></span>
                            <span className='text-sm'>{member.emailAddress}</span>
                          </div>
                        </div>
                      </div>
                      <div className='flex gap-1'>
                        {
                          (member.type !== null) &&
                          <span className='bg-blue-500 text-white text-xs rounded-lg px-2 pb-2px font-medium'>
                            {memberType[member.type]}
                          </span>
                        }
                        {
                          (member.level !== null) &&
                          <span className='bg-red-500 text-white text-xs rounded-lg px-2 pb-2px font-medium'>
                            {memberPosition[member.level]}
                          </span>
                        }
                      </div>
                    </div>
                  )
                );
              })
              : searchMemberValue.memberList.length > 0 || currentPosition !== 'all'
                ? <p className='text-sm text-red-500 text-center'>Not found data</p>
                : <p className='text-sm text-red-500 text-center'>Loading...</p>
          }
        </div>
      </div>
    </div>
  );
};

export default memo(Team);
