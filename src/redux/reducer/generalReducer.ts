import { EGeneralTypeAction } from '../action/generalAction/constants';
import * as IAC from '../action/generalAction/interface';

export interface IGeneralReducer {
  projectCustomer: number | null
  projectName: string
  projectCode: string
  timeStart: string
  timeEnd: string
  note: string | undefined
  allUser: boolean
  projectType: number
}

const INITIAL_STATE = {
  projectCustomer: null,
  projectName: '',
  projectCode: '',
  timeStart: '',
  timeEnd: '',
  note: '',
  allUser: false,
  projectType: 1
};

const generalReducer = (
  state = INITIAL_STATE,
  action: IAC.IUpdatePrjCustomerAction
  | IAC.IUpdatePrjNameAction
  | IAC.IUpdatePrjCodeAction
  | IAC.IUpdateTimeStartAction
  | IAC.IUpdateTimeEndAction
  | IAC.IUpdatePrjNoteAction
  | IAC.IUpdateAllUserAction
  | IAC.IUpdatePrjTypeAction
  | IAC.IUpdateGeneralFormAction
): IGeneralReducer => {
  switch (action.type) {
    case EGeneralTypeAction.PROJECT_CUSTOMER:
      return {
        ...state,
        projectCustomer: action.payload
      };
    case EGeneralTypeAction.PROJECT_NAME:
      return {
        ...state,
        projectName: action.payload
      };
    case EGeneralTypeAction.PROJECT_CODE:
      return {
        ...state,
        projectCode: action.payload
      };
    case EGeneralTypeAction.NOTE:
      return {
        ...state,
        note: action.payload
      };
    case EGeneralTypeAction.ALL_USER:
      return {
        ...state,
        allUser: action.payload
      };
    case EGeneralTypeAction.TIME_START:
      return {
        ...state,
        timeStart: action.payload
      };
    case EGeneralTypeAction.TIME_END:
      return {
        ...state,
        timeEnd: action.payload
      };
    case EGeneralTypeAction.PROJECT_TYPE:
      return {
        ...state,
        projectType: action.payload
      };
    case EGeneralTypeAction.UPDATE_GENERAL_FORM_INFO:
      return {
        ...state,
        projectCustomer: action.payload.customerId,
        projectName: action.payload.name,
        projectCode: action.payload.code,
        timeStart: action.payload.timeStart,
        timeEnd: action.payload.timeEnd,
        note: action.payload.note,
        allUser: action.payload.isAllUserBelongTo,
        projectType: action.payload.projectType
      };

    default:
      return state;
  }
};

export default generalReducer;
