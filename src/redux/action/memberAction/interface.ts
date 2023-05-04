import { IAllBranch, IMember, IUser } from '../../../interface/interface';
import { EMemberTypeAction } from './constants';

// member
export interface ISendMemberListAction {
  type: EMemberTypeAction.MEMBER_LIST
  payload: IMember[]
}

export interface IMemberLoadAction {
  type: EMemberTypeAction.LOADING
  payload: boolean
}

export interface IMemberErrorAction {
  type: EMemberTypeAction.ERROR
  payload: {
    errorState: boolean
    errorMessage: string
  }
}

export interface IMemberSelectedAction {
  type: EMemberTypeAction.MEMBER_SELECTED
  payload: IMember
}

export interface IMemberUpdateSelectedAction {
  type: EMemberTypeAction.UPDATE_SELECTED_MEMBER_LIST
  payload: IMember[]
}

export interface IMemberEditSelectedAction {
  type: EMemberTypeAction.EDIT_SELECTED_MEMBER
  payload: IUser[]
}

export interface IMemberRemoveAction {
  type: EMemberTypeAction.MEMBER_REMOVED
  payload: IMember
}

export interface IMemberUpdateTypeAction {
  type: EMemberTypeAction.MEMBER_UPDATE_TYPE
  payload: IMember
}

export interface IMemberAllBranchAction {
  type: EMemberTypeAction.ALL_BRANCH_FILTER
  payload: IAllBranch[]
}
