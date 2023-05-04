import React, { useEffect, useState, useCallback } from 'react';
import { Select, Input } from 'antd';
import { EProjectStatus } from '../../../constants/constants';
import { GrSearch } from 'react-icons/gr';
import ProjectItem from './components/ProjectItem/ProjectItem';
import { getAllProject, getQuantityProject } from '../../../service/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { ISelectOption, IGeneralState, IProjectsCustomer } from '../../../interface/interface';
import Spin from '../../../components/Spin/Spin';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { projectRestructure } from '../../../utils/projectRestructure';
import { useNavigate } from 'react-router-dom';
import { ERoute } from '../../../router/routerLink';
import * as Action from '../../../redux/action/projectAction/action';

const Project = (): JSX.Element => {
  const {
    projectsList, isLoading, isError, errorMessage, quantity, isRefresh
  } = useSelector((state: IGeneralState) => state.projectReducer);

  const [searchValue, setSearchValue] = useState('');
  const [prjsRestrucList, setPrjsRestrucList] = useState<IProjectsCustomer[]>([]);
  const [currentOption, setCurrentOption] = useState<ISelectOption>(
    { value: '0', label: `${EProjectStatus.ACTIVE} (${quantity[0].quantity})` }
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const optionSelect = [
    {
      value: '0',
      label: `${EProjectStatus.ACTIVE} (${quantity[0].quantity})`
    },
    {
      value: '1',
      label: `${EProjectStatus.DEACTIVE} (${quantity[1].quantity})`
    },
    {
      value: '',
      label: `${EProjectStatus.ALL} (${(quantity[0].quantity + quantity[1].quantity)})`
    }
  ];
  useEffect(() => {
    switch (currentOption.value) {
      case '0':
        setCurrentOption(optionSelect[0]);
        break;
      case '1':
        setCurrentOption(optionSelect[1]);
        break;
      case '':
        setCurrentOption(optionSelect[2]);
        break;
      default:
        break;
    }
  }, [quantity]);

  const handleOptionChange = useCallback(
    (option: ISelectOption): void => {
      if (option.value !== currentOption.value) {
        setCurrentOption(option);
      }
    }, [currentOption]);

  const getProjectsAndQuanti = async (): Promise<void> => {
    try {
      dispatch(Action.projectLoadAction(true));
      const res = await getQuantityProject();
      const response = await getAllProject(currentOption.value, searchValue);
      dispatch(Action.setQuantiProjectAction(res.data.result));
      dispatch(Action.sortProjectAction(response.data.result));
      dispatch(Action.projectLoadAction(false));
    } catch (error) {
      dispatch(Action.projectLoadAction(false));
      const errorMessage = isAxiosError(error)
        ? error.response?.data?.error.message
        : 'Something went wrong?';
      dispatch(Action.projectErrorAction({ errorState: true, errorMessage }));
    }
  };
  useEffect(() => {
    void getProjectsAndQuanti();
    if (isError && (errorMessage.length > 0)) {
      toast.error(errorMessage);
    }
  }, [currentOption.value, isRefresh]);

  useEffect(() => {
    const resultList = projectRestructure(projectsList);
    setPrjsRestrucList(resultList);
  }, [projectsList]);

  const handelSearch = (): void => {
    if (!isLoading) {
      void getProjectsAndQuanti();
    }
  };

  const handleSearchValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  }, []);

  return (
    <div className='m-0 lg:m-6 bg-white shadow-xl min-h-screen lg:min-h-250px'>
      <div className='p-3'>
        <div className='flex items-center justify-between'>
          <h4 className='text-xl'>Manage Projects</h4>
        </div>
        <hr className='border dark:bg-gray-800' />
        <div className='flex flex-wrap justify-between items-center mt-4 h-12'>
          <button
            className='bg-green-550 text-white hover:bg-white border hover:border-blue-500
             hover:text-black font-bold p-2 lg:py-3 lg:px-4 rounded transition-all duration-300
              order-2 lg:order-1'
            onClick={() => navigate(ERoute.CREATE_PROJECT)}
          >
            + New Project
          </button>
          <Select
            size='large'
            className='w-52 order-3'
            labelInValue
            value={currentOption}
            onChange={handleOptionChange}
            options={optionSelect}
            disabled={isLoading}
          />
          <div className='order-1 lg:order-3 basis-full lg:basis-1/3 mb-3 lg:mb-0'>
            <Input
              className='w-full p-0 pl-3 text-base'
              placeholder="Search project..."
              value={searchValue}
              onChange={handleSearchValueChange}
              disabled={!!isLoading}
              onPressEnter={handelSearch}
              suffix={
                <GrSearch onClick={handelSearch}
                  className={`bg-green-550 h-full w-full px-4 py-3 cursor-pointer rounded-r 
              ${isLoading ? 'hover:cursor-not-allowed' : ''}`} />
              }
            />
          </div>
        </div>
        <div className='mt-14 lg:mt-8'>
          <Spin isLoading={isLoading} tip='Loading...' />
          {prjsRestrucList?.length > 0 && !isLoading
            ? prjsRestrucList.map((projectItem) => (
              <div key={projectItem.customerName}>
                <ProjectItem projectItem={projectItem} />
              </div>
            ))
            : !isLoading &&
            <div className='text-center lg:-translate-x-24 text-red-500'>Not Found Data</div>
          }
        </div>
      </div>
    </div>
  );
};

export default Project;
