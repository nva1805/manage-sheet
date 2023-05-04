/* eslint-disable no-case-declarations */
import { ITask } from '../../interface/interface';
import { ETaskTypeAction } from '../action/taskAction/constants';
import * as IAC from '../action/taskAction/interface';

export interface ITaskReducer {
  taskList: ITask[]
  commonTask: ITask[]
  otherTask: ITask[]
  taskCanBillable: ITask[]
  taskCanNotBillable: ITask[]
  isLoading: boolean
  isError: boolean
  errorMessage: string
}

const INITIAL_STATE = {
  taskList: [],
  commonTask: [],
  otherTask: [],
  taskCanBillable: [],
  taskCanNotBillable: [],
  isLoading: false,
  isError: false,
  errorMessage: ''
};

const taskReducer = (
  state: ITaskReducer = INITIAL_STATE,
  action: IAC.ITaskSendTaskListAction
  | IAC.ITaskErrorAction
  | IAC.ITaskLoadAction
  | IAC.ITaskBillableAction
  | IAC.ITaskMoveToCanBillableAction
  | IAC.ITaskMoveToCanNotBillableAction
  | IAC.ITaskBillableAllAction
  | IAC.ITaskSendListEditTaskAction
  | IAC.ITaskResetListAction
): ITaskReducer => {
  switch (action.type) {
    case ETaskTypeAction.TASK_LIST:
      const commonTask = action.payload?.filter((task) =>
        task.type === 0).map((task) => ({ ...task, billable: true }));
      const otherTask = action.payload?.filter((task) =>
        task.type !== 0).map((task) => ({ ...task, billable: false }));
      return {
        ...state,
        taskList: action?.payload,
        taskCanBillable: state.taskCanBillable.length > 0
          ? [...state.taskCanBillable]
          : [...commonTask],
        taskCanNotBillable: state.taskCanNotBillable.length > 0
          ? [...state.taskCanNotBillable]
          : [...otherTask],
        isError: false,
        isLoading: false,
        errorMessage: ''
      };
    case ETaskTypeAction.ERROR:
      return {
        ...state,
        isError: action?.payload?.errorState,
        errorMessage: action?.payload?.errorMessage
      };
    case ETaskTypeAction.LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case ETaskTypeAction.TASK_BILLABLE:
      const taskCanBillableUpdated = state.taskCanBillable.map((task) => {
        if (task.id === action.payload.id) {
          const taskUpdated = { ...task, billable: action.payload.billable };
          return taskUpdated;
        }
        return task;
      });
      return {
        ...state,
        taskCanBillable: [...taskCanBillableUpdated]
      };

    case ETaskTypeAction.TASK_BILLABLE_ALL:
      return {
        ...state,
        taskCanBillable: action.payload
      };
    case ETaskTypeAction.TASK_MOVE_FROM_CAN_BILLABLE_TO_CANNOT_BILLABLE_LIST:
      const newtaskCanBillable = state.taskCanBillable;
      const taskIndex = newtaskCanBillable.findIndex((task) => task.id === action.payload?.id);
      newtaskCanBillable.splice(taskIndex, 1);
      return {
        ...state,
        taskCanBillable: [...newtaskCanBillable],
        taskCanNotBillable: [
          action.payload,
          ...state.taskCanNotBillable
        ]
      };
    case ETaskTypeAction.TASK_MOVE_FROM_CANNOT_BILLABLE_TO_CAN_BILLABLE_LIST:
      const newtaskCanNotBillableList = state.taskCanNotBillable;
      newtaskCanNotBillableList.map((task) => ({ ...task, billable: false }));
      const taskId = newtaskCanNotBillableList.findIndex((task) => task.id === action.payload.id);
      newtaskCanNotBillableList.splice(taskId, 1);
      return {
        ...state,
        taskCanNotBillable: [...newtaskCanNotBillableList],
        taskCanBillable: [
          action.payload,
          ...state.taskCanBillable
        ]
      };
    case ETaskTypeAction.TASK_EDIT_LIST:
      let updateTaskCanBillable: ITask[] = [];
      let updateTaskCanNotBillable: ITask[] = [];
      updateTaskCanBillable = state.taskList.filter(tasks => {
        const foundTask = action.payload.find(taskSM => taskSM.taskId === tasks.id);
        if (foundTask != null) {
          return true;
        }
        return false;
      }).map(newTaskBillable => {
        const foundUser = action.payload.find(tasks => tasks.taskId === newTaskBillable.id);
        if (foundUser != null) {
          newTaskBillable.billable = foundUser.billable;
        }
        return newTaskBillable;
      });
      console.log('updateTaskCanBillable', updateTaskCanBillable.length);
      updateTaskCanNotBillable = state.taskList.filter(tasks =>
        updateTaskCanBillable.every((taskCan) => taskCan.id !== tasks.id)
      );
      console.log('updateTaskCanNotBillable', updateTaskCanNotBillable.length);
      return {
        ...state,
        taskCanBillable: updateTaskCanBillable,
        taskCanNotBillable: updateTaskCanNotBillable
      };
    case ETaskTypeAction.TASK_RESET_LIST:
      return {
        ...state,
        taskCanBillable: []
      };
    default:
      return state;
  }
};

export default taskReducer;
