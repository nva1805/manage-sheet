import { IAllBranch, IMember, IUser } from '../../../interface/interface';
import * as IAC from './interface';
import { EMemberTypeAction } from './constants';

// member
export const setMemberListAction = (payload: IMember[]): IAC.ISendMemberListAction => {
  return {
    type: EMemberTypeAction.MEMBER_LIST,
    payload
  };
};

export const memberLoadAction = (state: boolean): IAC.IMemberLoadAction => {
  return {
    type: EMemberTypeAction.LOADING,
    payload: state
  };
};

export const memberErrorAction = (payload: { errorState: boolean, errorMessage: string }): IAC.IMemberErrorAction => {
  return {
    type: EMemberTypeAction.ERROR,
    payload: {
      errorState: payload.errorState,
      errorMessage: payload.errorMessage
    }
  };
};

export const memberSelectedAction = (payload: IMember): IAC.IMemberSelectedAction => {
  return {
    type: EMemberTypeAction.MEMBER_SELECTED,
    payload
  };
};

export const memberRemovedAction = (payload: IMember): IAC.IMemberRemoveAction => {
  return {
    type: EMemberTypeAction.MEMBER_REMOVED,
    payload
  };
};

export const memberUpdateTypeAction = (payload: IMember): IAC.IMemberUpdateTypeAction => {
  return {
    type: EMemberTypeAction.MEMBER_UPDATE_TYPE,
    payload
  };
};

export const memberUpdateSelectedListAction = (payload: IMember[]): IAC.IMemberUpdateSelectedAction => {
  return {
    type: EMemberTypeAction.UPDATE_SELECTED_MEMBER_LIST,
    payload
  };
};

export const editMemberSelected = (payload: IUser[]): IAC.IMemberEditSelectedAction => {
  return {
    type: EMemberTypeAction.EDIT_SELECTED_MEMBER,
    payload
  };
};

export const updateAllBranchFilter = (payload: IAllBranch[]): IAC.IMemberAllBranchAction => {
  return {
    type: EMemberTypeAction.ALL_BRANCH_FILTER,
    payload
  };
};
