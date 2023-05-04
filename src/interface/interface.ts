import { IUserReducer } from '../redux/reducer/authReducer';
import { IProjectReducer } from '../redux/reducer/projectReducer';
import { ICustomerReducer } from '../redux/reducer/customerReducer';
import { IMemberReducer } from '../redux/reducer/memberReducer';
import { ITaskReducer } from '../redux/reducer/taskReducer';
import { INotificationReducer } from '../redux/reducer/notificationReducer';
import { IGeneralReducer } from '../redux/reducer/generalReducer';

export interface IUserLoginData {
  userNameOrEmailAddress: string
  password: string
  rememberClient: boolean
}

export interface IGeneralState {
  authReducer: IUserReducer
  projectReducer: IProjectReducer
  customerReducer: ICustomerReducer
  generalReducer: IGeneralReducer
  memberReducer: IMemberReducer
  taskReducer: ITaskReducer
  notificationReducer: INotificationReducer
}

export interface IProjectItem {
  activeMember: number
  code: string
  customerName: string
  id: number
  name: string
  pms: string[]
  projectType: number
  status: number
  timeEnd?: string
  timeStart: string
}

export interface IQuantiProject {
  status: number
  quantity: number
}

export interface ISelectOption {
  value: string
  label: string
  key?: string
  disabled?: boolean | undefined
  title?: string | undefined
}

export interface IProjectsCustomer {
  customerName: string
  projects: IProjectItem[]
}

export interface ICustomerList {
  name: string
  id: number
}
export interface IMember {
  name: string
  id: number
  emailAddress: string
  isActive: boolean
  type: number
  jobTitle?: string
  level: number
  avatarFullPath: string
  avatarPath: string
  branch: number
  branchColor?: string
  branchDisplayName?: string
  branchId: number
  userCode?: string
}

export interface ITask {
  id: number
  isDeleted: boolean
  name: string
  type: 0 | 1
  billable?: boolean
}

export interface IAllBranch {
  id: number
  displayName: string
  name: string
}

export interface IUser {
  userId: number
  type: number
  id?: number
}
export interface ITaskSM {
  taskId: number
  id?: number
  billable: boolean | undefined
}
export interface IProjectSummitData {
  code: string
  customerId: number | null
  isAllUserBelongTo: boolean
  isNotifyToKomu: boolean
  komuChannelId: string
  name: string
  id?: number
  note: string | undefined
  projectType: number
  tasks: ITaskSM[]
  timeEnd: string
  timeStart: string
  users: IUser[]
}

export interface ICreateClient {
  name: string
  code: string
  address: string
}
export interface IViewTeam {
  billableWorkingTime: number
  projectUserType: number
  totalWorkingTime: number
  userID: number
  userName: string
}

export interface IViewTask {
  billable: boolean
  billableWorkingTime: number
  taskId: number
  taskName: string
  totalWorkingTime: number
}

export interface IValidateSummitData {
  projectCode: string
  projectCustomer: number | null
  projectName: string
  timeStart: string
  memberSelected: IMember[]
}
