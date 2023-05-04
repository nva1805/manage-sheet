import { ITask, ITaskSM } from '../../../interface/interface';
import { ETaskTypeAction } from './constants';
import * as IAC from './interface';

// task
export const setTaskListAction = (payload: ITask[]): IAC.ITaskSendTaskListAction => {
  return {
    type: ETaskTypeAction.TASK_LIST,
    payload
  };
};

export const taskLoadAction = (state: boolean): IAC.ITaskLoadAction => {
  return {
    type: ETaskTypeAction.LOADING,
    payload: state
  };
};

export const taskErrorAction = (payload: { errorState: boolean, errorMessage: string }): IAC.ITaskErrorAction => {
  return {
    type: ETaskTypeAction.ERROR,
    payload: {
      errorState: payload.errorState,
      errorMessage: payload.errorMessage
    }
  };
};

export const taskBillableAction = (payload: ITask): IAC.ITaskBillableAction => {
  return {
    type: ETaskTypeAction.TASK_BILLABLE,
    payload
  };
};

export const taskMoveToCanBillableAction = (payload: ITask): IAC.ITaskMoveToCanNotBillableAction => {
  return {
    type: ETaskTypeAction.TASK_MOVE_FROM_CANNOT_BILLABLE_TO_CAN_BILLABLE_LIST,
    payload
  };
};

export const taskMoveToCanNotBillableAction = (payload: ITask): IAC.ITaskMoveToCanBillableAction => {
  return {
    type: ETaskTypeAction.TASK_MOVE_FROM_CAN_BILLABLE_TO_CANNOT_BILLABLE_LIST,
    payload
  };
};

export const taskIsBillableAllAction = (payload: ITask[]): IAC.ITaskBillableAllAction => {
  return {
    type: ETaskTypeAction.TASK_BILLABLE_ALL,
    payload
  };
};

export const updateTaskListAction = (payload: ITaskSM[]): IAC.ITaskSendListEditTaskAction => {
  return {
    type: ETaskTypeAction.TASK_EDIT_LIST,
    payload
  };
};

export const resetListTaskCanBillable = (): IAC.ITaskResetListAction => {
  return {
    type: ETaskTypeAction.TASK_RESET_LIST
  };
};
