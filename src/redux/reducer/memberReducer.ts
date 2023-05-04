/* eslint-disable no-case-declarations */
import { IAllBranch, IMember } from '../../interface/interface';
import { EMemberTypeAction } from '../action/memberAction/constants';
import * as IAC from '../action/memberAction/interface';
export interface IMemberReducer {
  memberList: IMember[]
  memberSelected: IMember[]
  allBranchFilter: IAllBranch[]
  isLoading: boolean
  isError: boolean
  errorMessage: string
}

const INITIAL_STATE = {
  memberList: [],
  memberSelected: [],
  allBranchFilter: [],
  isLoading: false,
  isError: false,
  errorMessage: ''
};

const memberReducer = (
  state: IMemberReducer = INITIAL_STATE,
  action: IAC.ISendMemberListAction
  | IAC.IMemberErrorAction
  | IAC.IMemberLoadAction
  | IAC.IMemberSelectedAction
  | IAC.IMemberRemoveAction
  | IAC.IMemberUpdateTypeAction
  | IAC.IMemberUpdateSelectedAction
  | IAC.IMemberEditSelectedAction
  | IAC.IMemberAllBranchAction
): IMemberReducer => {
  switch (action.type) {
    case EMemberTypeAction.MEMBER_LIST:
      const quantiSelected = state.memberSelected.length;
      return {
        ...state,
        memberList: quantiSelected === 0 ? action.payload : [...state.memberList],
        isError: false,
        isLoading: false,
        errorMessage: ''
      };
    case EMemberTypeAction.ERROR:
      return {
        ...state,
        isError: action.payload.errorState,
        errorMessage: action.payload.errorMessage
      };
    case EMemberTypeAction.LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case EMemberTypeAction.MEMBER_SELECTED:
      const newMemberSelected = [...state.memberSelected];
      newMemberSelected.push(action.payload);
      const updatedMemberList = newMemberSelected.map((member, index) => {
        if (index === 0) {
          return { ...member, type: 1 };
        }
        return { ...member };
      });

      const newMemberList = state.memberList;
      const memberIndex = newMemberList.findIndex((mem) => mem.id === action.payload.id);
      newMemberList.splice(memberIndex, 1);
      return {
        ...state,
        memberSelected: updatedMemberList,
        memberList: [...newMemberList]
      };
    case EMemberTypeAction.UPDATE_SELECTED_MEMBER_LIST:
      return {
        ...state,
        memberSelected: action.payload
      };
    case EMemberTypeAction.EDIT_SELECTED_MEMBER:
      const memberSelectedLength = state.memberSelected.length;
      let updateMemberList: IMember[] = [];
      let updateMemberSelected: IMember[] = [];
      updateMemberList = state.memberList.filter(memL => {
        const foundMember = action.payload.find(memSl => memSl.userId === memL.id);
        if (foundMember == null) {
          return true;
        }
        return false;
      });
      updateMemberSelected = state.memberList.filter(memL =>
        action.payload.find((user) => user.userId === memL.id)
      ).map(member => {
        const foundUser = action.payload.find(user => user.userId === member.id);
        if (foundUser != null) {
          member.type = foundUser.type;
        }
        return member;
      });
      console.log('reducer', updateMemberSelected);
      return {
        ...state,
        memberSelected: memberSelectedLength > 0 ? [...state.memberSelected] : updateMemberSelected,
        memberList: updateMemberList
      };
    case EMemberTypeAction.MEMBER_REMOVED:
      const newMemberSelectList = state.memberSelected;
      const memberRemoved = { ...action.payload, type: 0 };
      const memIndex = newMemberSelectList.findIndex((mem) => mem.id === memberRemoved.id);
      console.log(memberRemoved);
      newMemberSelectList.splice(memIndex, 1);
      return {
        ...state,
        memberSelected: newMemberSelectList,
        memberList: [
          memberRemoved,
          ...state.memberList
        ]
      };
    case EMemberTypeAction.MEMBER_UPDATE_TYPE:
      const newMemberSelectLst = state.memberSelected;
      const updatedMemberTypeList = newMemberSelectLst.map((mem) => {
        if (mem.id === action.payload.id) {
          return { ...mem, type: action.payload.type };
        }
        return mem;
      });
      return {
        ...state,
        memberSelected: updatedMemberTypeList
      };

    case EMemberTypeAction.ALL_BRANCH_FILTER:
      return {
        ...state,
        allBranchFilter: action.payload
      };
    default:
      return state;
  }
};

export default memberReducer;
