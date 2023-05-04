import React, { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IGeneralState, ITask } from '../../../interface/interface';
import { FaTimes } from 'react-icons/fa';
import { BsPlusCircle } from 'react-icons/bs';
import * as Action from '../../../redux/action/taskAction/action';
import { getAllTask } from '../../../service/apiService';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

const Task = (): JSX.Element => {
  const dispatch = useDispatch();
  const [isBillable, setIsBillable] = useState(true);
  const { taskList, taskCanBillable, taskCanNotBillable } = useSelector(
    (state: IGeneralState) => state.taskReducer);
  const { isEdit, projectInfo } = useSelector(
    (state: IGeneralState) => state.projectReducer);
  console.log('taskList', taskList.length);
  console.log('taskCanBillable', taskCanBillable.length);
  console.log('taskCanNotBillable', taskCanNotBillable.length);

  const handleTaskCheckboxChange = (taskId: number): void => {
    const taskToUpdate = taskCanBillable.find((task) => task.id === taskId);
    console.log('taskToUpdate', taskId);
    if (taskToUpdate != null) {
      const taskUpdated = { ...taskToUpdate, billable: !(taskToUpdate.billable ?? false) };
      dispatch(Action.taskBillableAction(taskUpdated));
    }
  };

  useEffect(() => {
    const fetchAllTask = async (): Promise<void> => {
      try {
        const res = await getAllTask();
        await new Promise<void>((resolve) => {
          dispatch(Action.setTaskListAction(res?.data?.result));
          resolve();
        });
        if (isEdit && projectInfo.users.length > 0) {
          dispatch(Action.updateTaskListAction(projectInfo.tasks));
        }
      } catch (error) {
        const errorMessage = isAxiosError(error) || error instanceof Error
          ? error.message
          : 'Something went wrong?, try later!';
        dispatch(Action.taskErrorAction({ errorState: true, errorMessage }));
        toast.error(errorMessage);
      }
    };
    void fetchAllTask();
  }, []);

  useEffect(() => {
    setIsBillable(taskCanBillable.length === taskCanBillable.filter((task) => task.billable === true).length);
  }, [taskCanBillable, handleTaskCheckboxChange]);

  const handleisBillable = (): void => {
    setIsBillable(!isBillable);
    const taskCanBillableUpdated = taskCanBillable.map((task) => ({ ...task, billable: !isBillable }));
    dispatch(Action.taskIsBillableAllAction(taskCanBillableUpdated));
  };

  const handleMoveToCannotSelectTask = (task: ITask): void => {
    const unBillable = { ...task, billable: false };
    dispatch(Action.taskMoveToCanNotBillableAction(unBillable));
  };

  return (
    <div className='mt-5 flex justify-between flex-col lg:flex-row'>
      <div className='flex flex-col gap-3 basis-1/2 px-3 mr-12'>
        <div className='flex justify-between items-center font-bold'>
          <span>Task</span>
          <div className='flex items-center gap-3'>
            <label
              className='cursor-pointer select-none'
              htmlFor='isBillable'
            >
              Billable
            </label>
            <input
              className='mr-8 h-4 w-4 cursor-pointer'
              id='isBillable'
              type="checkbox"
              checked={isBillable}
              onChange={handleisBillable}
            />
          </div>
        </div>
        <div className='flex flex-col h-96 overflow-scroll gap-2 pr-2'>
          {
            taskCanBillable.length > 0 &&
            taskCanBillable.map((task) => (
              <div
                key={task.id}
                className={`${(task.billable === true) ? 'bg-gray-200' : 'bg-white'}
               hover:bg-slate-100 border flex justify-between items-center text-black p-5 
               rounded transition-all duration-300`}>
                <div className='flex gap-6 items-center'>
                  <FaTimes
                    className='text-xl cursor-pointer hover:scale-150 duration-300 hover:text-red-400'
                    onClick={() => handleMoveToCannotSelectTask(task)}
                  />
                  <h4 className='m-0 w-80 truncate select-none leading-6'>{task.name}</h4>
                </div>
                <input
                  className='h-4 w-4 cursor-pointer'
                  type="checkbox"
                  checked={task.billable}
                  onChange={() => handleTaskCheckboxChange(task.id)}
                />
              </div>
            ))
          }
        </div>
      </div>

      <div className='flex flex-col gap-3 basis-1/2 lg:ml-12'>
        <div className='flex justify-between items-center font-bold'>
          <span> Select Task</span>
        </div>
        <div className='flex flex-col h-96 overflow-scroll gap-2 pr-2'>
          {
            taskCanNotBillable.length > 0 &&
            taskCanNotBillable.map((task) => (
              <div
                key={task.id}
                className='flex justify-between hover:bg-slate-100 items-center bg-white
               rounded border text-black p-5 transition-all duration-300'>
                <div className='flex gap-6 items-center'>
                  <BsPlusCircle
                    className='text-xl cursor-pointer hover:scale-150 duration-300 hover:text-red-400'
                    onClick={() => dispatch(Action.taskMoveToCanBillableAction(task))}
                  />
                  <h4 className='m-0 w-80 truncate select-none leading-6'>{task.name}</h4>
                </div>
                <span>{(task.type === 0) ? 'Common Task' : 'Other task'}</span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default memo(Task);
