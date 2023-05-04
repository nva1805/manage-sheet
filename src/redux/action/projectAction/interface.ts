import { IProjectItem, IProjectSummitData, IQuantiProject, IViewTask, IViewTeam } from '../../../interface/interface';
import { EProjectTypeAction } from './constants';

export interface IProjectLoadAction {
  type: EProjectTypeAction.LOADING
  payload: boolean
}

export interface IProjectErrorAction {
  type: EProjectTypeAction.ERROR
  payload: {
    errorState: boolean
    errorMessage: string
  }
}
export interface IProjectSortAction {
  type: EProjectTypeAction.PROJECTS_LIST
  payload: IProjectItem[]
}

export interface IProjectSendEditIFAction {
  type: EProjectTypeAction.PROJECT_EDIT_INFO
  payload: IProjectSummitData
}

export interface IProjectQuantiAction {
  type: EProjectTypeAction.PROJECTS_QUANTI
  payload: IQuantiProject[]
}

export interface IProjectTeamAction {
  type: EProjectTypeAction.PROJECTS_VIEW_TEAM
  payload: IViewTeam[]
}

export interface IProjectRefreshAction {
  type: EProjectTypeAction.REFRESH
  payload: boolean
}

export interface IProjectTaskAction {
  type: EProjectTypeAction.PROJECTS_VIEW_TASK
  payload: IViewTask[]
}

export interface IProjectIdAction {
  type: EProjectTypeAction.SET_PROJECT_ID
  payload: number
}

export interface ICreateEditLoadingAction {
  type: EProjectTypeAction.CREATE_EDIT_LOADING
  payload: boolean
}
