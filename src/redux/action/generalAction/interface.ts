import { IProjectSummitData } from '../../../interface/interface';
import { EGeneralTypeAction } from './constants';

export interface IUpdatePrjCustomerAction {
  type: EGeneralTypeAction.PROJECT_CUSTOMER
  payload: number | null
}
export interface IUpdatePrjNameAction {
  type: EGeneralTypeAction.PROJECT_NAME
  payload: string
}
export interface IUpdatePrjCodeAction {
  type: EGeneralTypeAction.PROJECT_CODE
  payload: string
}
export interface IUpdateTimeStartAction {
  type: EGeneralTypeAction.TIME_START
  payload: string
}
export interface IUpdateTimeEndAction {
  type: EGeneralTypeAction.TIME_END
  payload: string
}
export interface IUpdatePrjNoteAction {
  type: EGeneralTypeAction.NOTE
  payload: string | undefined
}
export interface IUpdateAllUserAction {
  type: EGeneralTypeAction.ALL_USER
  payload: boolean
}
export interface IUpdatePrjTypeAction {
  type: EGeneralTypeAction.PROJECT_TYPE
  payload: number
}

export interface IUpdateGeneralFormAction {
  type: EGeneralTypeAction.UPDATE_GENERAL_FORM_INFO
  payload: IProjectSummitData
}
