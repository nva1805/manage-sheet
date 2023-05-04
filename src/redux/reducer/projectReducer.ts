import * as IGeneral from '../../interface/interface';
import { EProjectTypeAction } from '../action/projectAction/constants';
import * as IAC from '../action/projectAction/interface';

export interface IProjectReducer {
  projectsList: IGeneral.IProjectItem[]
  isLoading: boolean
  isCreateEditLoading: boolean
  isError: boolean
  isEdit: boolean
  errorMessage: string
  isRefresh: boolean
  quantity: IGeneral.IQuantiProject[]
  projectInfo: IGeneral.IProjectSummitData
  teamViewList: IGeneral.IViewTeam[]
  taskViewList: IGeneral.IViewTask[]
}

const INITIAL_STATE = {
  projectsList: [],
  isLoading: false,
  isCreateEditLoading: false,
  isError: false,
  isEdit: false,
  errorMessage: '',
  quantity: [
    {
      status: 0,
      quantity: 0
    },
    {
      status: 1,
      quantity: 0
    }
  ],
  projectInfo: {
    code: '',
    customerId: null,
    id: undefined,
    isAllUserBelongTo: false,
    isNotifyToKomu: false,
    komuChannelId: '',
    name: '',
    note: undefined,
    projectType: 1,
    tasks: [],
    timeEnd: '',
    timeStart: '',
    users: []
  },
  teamViewList: [],
  taskViewList: [],
  isRefresh: false
};

const projectReducer = (state = INITIAL_STATE,
  action: IAC.IProjectSortAction
  | IAC.IProjectLoadAction
  | IAC.IProjectErrorAction
  | IAC.IProjectQuantiAction
  | IAC.IProjectSendEditIFAction
  | IAC.IProjectTeamAction
  | IAC.IProjectTaskAction
  | IAC.IProjectRefreshAction
  | IAC.IProjectIdAction
  | IAC.ICreateEditLoadingAction
): IProjectReducer => {
  switch (action.type) {
    case EProjectTypeAction.PROJECTS_LIST:
      return {
        ...state,
        projectsList: action.payload,
        isError: false,
        isLoading: false,
        isEdit: false,
        errorMessage: ''
      };
    case EProjectTypeAction.PROJECTS_QUANTI:
      return {
        ...state,
        quantity: action.payload
      };
    case EProjectTypeAction.PROJECT_EDIT_INFO:
      return {
        ...state,
        isEdit: true,
        projectInfo: action.payload
      };
    case EProjectTypeAction.SET_PROJECT_ID:
      return {
        ...state,
        projectInfo: { ...state.projectInfo, id: action.payload }
      };
    case EProjectTypeAction.ERROR:
      return {
        ...state,
        isError: action.payload.errorState,
        errorMessage: action.payload.errorMessage
      };
    case EProjectTypeAction.LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case EProjectTypeAction.CREATE_EDIT_LOADING:
      return {
        ...state,
        isCreateEditLoading: action.payload
      };
    case EProjectTypeAction.PROJECTS_VIEW_TEAM:
      return {
        ...state,
        teamViewList: action.payload,
        isError: false,
        isLoading: false
      };
    case EProjectTypeAction.PROJECTS_VIEW_TASK:
      return {
        ...state,
        taskViewList: action.payload,
        isError: false,
        isLoading: false
      };
    case EProjectTypeAction.REFRESH:
      return {
        ...state,
        isRefresh: action.payload
      };
    default:
      return state;
  }
};

export default projectReducer;
