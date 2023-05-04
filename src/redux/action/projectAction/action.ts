import { IProjectItem, IProjectSummitData, IQuantiProject, IViewTask, IViewTeam } from '../../../interface/interface';
import { EProjectTypeAction } from './constants';
import * as IAC from './interface';

// project
export const projectLoadAction = (state: boolean): IAC.IProjectLoadAction => {
  return {
    type: EProjectTypeAction.LOADING,
    payload: state
  };
};

export const createEditLoading = (state: boolean): IAC.ICreateEditLoadingAction => {
  return {
    type: EProjectTypeAction.CREATE_EDIT_LOADING,
    payload: state
  };
};

export const projectErrorAction = ({ errorState, errorMessage }:
{ errorState: boolean, errorMessage: string }): IAC.IProjectErrorAction => {
  return {
    type: EProjectTypeAction.ERROR,
    payload: {
      errorState,
      errorMessage
    }
  };
};

export const sortProjectAction = (payload: IProjectItem[]): IAC.IProjectSortAction => {
  return {
    type: EProjectTypeAction.PROJECTS_LIST,
    payload
  };
};

export const setQuantiProjectAction = (payload: IQuantiProject[]): IAC.IProjectQuantiAction => {
  return {
    type: EProjectTypeAction.PROJECTS_QUANTI,
    payload
  };
};

export const setProjectEditIfAction = (payload: IProjectSummitData): IAC.IProjectSendEditIFAction => {
  return {
    type: EProjectTypeAction.PROJECT_EDIT_INFO,
    payload
  };
};

export const setProjectViewTeamAction = (payload: IViewTeam[]): IAC.IProjectTeamAction => {
  return {
    type: EProjectTypeAction.PROJECTS_VIEW_TEAM,
    payload
  };
};

export const refreshProjectAction = (payload: boolean): IAC.IProjectRefreshAction => {
  return {
    type: EProjectTypeAction.REFRESH,
    payload
  };
};

export const setProjectViewTaskAction = (payload: IViewTask[]): IAC.IProjectTaskAction => {
  return {
    type: EProjectTypeAction.PROJECTS_VIEW_TASK,
    payload
  };
};

export const setProjectId = (payload: number): IAC.IProjectIdAction => {
  return {
    type: EProjectTypeAction.SET_PROJECT_ID,
    payload
  };
};
