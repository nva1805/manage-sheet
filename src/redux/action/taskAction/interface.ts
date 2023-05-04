import { ITask, ITaskSM } from '../../../interface/interface';
import { ETaskTypeAction } from './constants';

// task
export interface ITaskSendTaskListAction {
  type: ETaskTypeAction.TASK_LIST
  payload: ITask[]
}

export interface ITaskSendListEditTaskAction {
  type: ETaskTypeAction.TASK_EDIT_LIST
  payload: ITaskSM[]
}

export interface ITaskLoadAction {
  type: ETaskTypeAction.LOADING
  payload: boolean
}

export interface ITaskErrorAction {
  type: ETaskTypeAction.ERROR
  payload: {
    errorState: boolean
    errorMessage: string
  }
}

export interface ITaskBillableAction {
  type: ETaskTypeAction.TASK_BILLABLE
  payload: ITask
}

export interface ITaskMoveToCanBillableAction {
  type: ETaskTypeAction.TASK_MOVE_FROM_CAN_BILLABLE_TO_CANNOT_BILLABLE_LIST
  payload: ITask
}

export interface ITaskMoveToCanNotBillableAction {
  type: ETaskTypeAction.TASK_MOVE_FROM_CANNOT_BILLABLE_TO_CAN_BILLABLE_LIST
  payload: ITask
}

export interface ITaskBillableAllAction {
  type: ETaskTypeAction.TASK_BILLABLE_ALL
  payload: ITask[]
}

export interface ITaskResetListAction {
  type: ETaskTypeAction.TASK_RESET_LIST
}
