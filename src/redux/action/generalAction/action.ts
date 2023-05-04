import { IProjectSummitData } from '../../../interface/interface';
import { EGeneralTypeAction } from './constants';
import * as IAC from './interface';
export const updatePrjCustomerAction = (payload: number | null): IAC.IUpdatePrjCustomerAction => {
  return {
    type: EGeneralTypeAction.PROJECT_CUSTOMER,
    payload
  };
};

export const updatePrjNameAction = (payload: string): IAC.IUpdatePrjNameAction => {
  return {
    type: EGeneralTypeAction.PROJECT_NAME,
    payload
  };
};

export const updatePrjCodeAction = (payload: string): IAC.IUpdatePrjCodeAction => {
  return {
    type: EGeneralTypeAction.PROJECT_CODE,
    payload
  };
};

export const updateTimeStartAction = (payload: string): IAC.IUpdateTimeStartAction => {
  return {
    type: EGeneralTypeAction.TIME_START,
    payload
  };
};

export const updateTimeEndAction = (payload: string): IAC.IUpdateTimeEndAction => {
  return {
    type: EGeneralTypeAction.TIME_END,
    payload
  };
};

export const updatePrjNoteAction = (payload: string | undefined): IAC.IUpdatePrjNoteAction => {
  return {
    type: EGeneralTypeAction.NOTE,
    payload
  };
};

export const updateSelectAllUserAction = (payload: boolean): IAC.IUpdateAllUserAction => {
  return {
    type: EGeneralTypeAction.ALL_USER,
    payload
  };
};

export const updatePrjTypeAction = (payload: number): IAC.IUpdatePrjTypeAction => {
  return {
    type: EGeneralTypeAction.PROJECT_TYPE,
    payload
  };
};

export const updateGeneralFormAction = (payload: IProjectSummitData):
IAC.IUpdateGeneralFormAction => {
  return {
    type: EGeneralTypeAction.UPDATE_GENERAL_FORM_INFO,
    payload
  };
};
