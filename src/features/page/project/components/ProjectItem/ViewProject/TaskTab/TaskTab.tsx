import React, { useEffect, useState } from 'react';
import { viewProjectTask } from '../../../../../../../service/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { IGeneralState } from '../../../../../../../interface/interface';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { convertMinutesToHours } from '../../../../../../../utils/convertTime';
import { setProjectViewTaskAction } from '../../../../../../../redux/action/projectAction/action';

interface TaskTabProps {
  id: number
  timeRange: {start: Date | undefined, end: Date | undefined}
}
const TaskTab = ({ id, timeRange }: TaskTabProps): JSX.Element => {
  const startTimeString = timeRange?.start?.toISOString().slice(0, 10);
  const endTimeString = timeRange?.end?.toISOString().slice(0, 10);
  const dispatch = useDispatch();
  const { taskViewList } = useSelector((state: IGeneralState) => state.projectReducer);
  const [allWorkingTime, setAllWorkingTime] = useState({ allBillableTime: 0, allTotalTime: 0, percent: 0 });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProjectTask = async (): Promise<void> => {
      try {
        setIsLoading(true);
        if (startTimeString !== undefined && endTimeString !== undefined) {
          const res = await viewProjectTask(id, startTimeString, endTimeString);
          console.log(res);
          dispatch(setProjectViewTaskAction(res?.data?.result));
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        const errorMessage = isAxiosError(error)
          ? error.message
          : 'Get task tab fail!';
        toast.error(errorMessage);
      }
    };
    void getProjectTask();
  }, [endTimeString]);

  useEffect(() => {
    if (taskViewList.length > 0) {
      const allBillableWorkingTime = taskViewList.reduce(
        (total: number, task: { billableWorkingTime: number }) =>
          total + task.billableWorkingTime,
        0
      );

      const allTotalWorkingTime = taskViewList.reduce(
        (total: number, task: { totalWorkingTime: number }) =>
          total + task.totalWorkingTime,
        0);
      setAllWorkingTime({
        allBillableTime: allBillableWorkingTime,
        allTotalTime: allTotalWorkingTime,
        percent: allTotalWorkingTime > 0
          ? (allBillableWorkingTime) / Number(allTotalWorkingTime) * 100
          : 0
      });
    }
  }, [taskViewList]);
  const allBillableWorkingHours = convertMinutesToHours(allWorkingTime.allBillableTime);
  const allTotalWorkingHours = convertMinutesToHours(allWorkingTime.allTotalTime);

  return (
    <div className={`h-72 overflow-y-scroll ${isLoading ? 'cursor-wait opacity-20' : ''}`}>
      <table className='w-full'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='w-1/6 truncate font-medium text-base py-2 px-2 text-start'>Billable Tasks</th>
            <th className='w-1/6 truncate font-medium text-base py-2 px-2 text-start'>Hours</th>
            <th className='w-3/6 truncate font-medium text-base py-2 px-2 text-start'>Percent (%)</th>
            <th className='w-2/6 truncate font-medium text-base py-2 px-2 text-center'>Billable Hour</th>
          </tr>
        </thead>
        <tbody>
          <tr className='border-b border-gray-300'>
            <td className='py-2 px-2 font-medium'>Total</td>
            <td className='py-2 px-2 font-medium'>{allTotalWorkingHours}</td>
            <td className='py-2'>
              <div className='h-3 bg-blue-100'>
                <div style={{ width: `${allWorkingTime.percent}%` }} className='h-full bg-blue-400'></div>
              </div>
            </td>
            <td
              className='py-2 px-2 font-medium text-center'
            >
              {`${allBillableWorkingHours} (${allWorkingTime.percent}%)`}
            </td>
          </tr>
          {
            taskViewList.length > 0 &&
      taskViewList.map((task) => {
        const taskWorkingPercent = task.totalWorkingTime > 0
          ? ((task.billableWorkingTime / task.totalWorkingTime) * 100)
          : 0;
        const taskBillableWorkingHours = task.billableWorkingTime > 0
          ? convertMinutesToHours(task.totalWorkingTime)
          : '';
        const taskTotalWorkingHours = task.totalWorkingTime > 0
          ? convertMinutesToHours(task.totalWorkingTime)
          : '';
        return (
          <tr key={task.taskId} className='border-b border-gray-300'>
            <td className='py-2 px-2'>{task.taskName}</td>
            <td className='py-2 px-2'>{taskTotalWorkingHours}</td>
            <td className='py-2 col-span-3'>
              <div className='h-3 bg-blue-100'>
                <div style={{ width: `${taskWorkingPercent.toString()}%` }} className='h-full bg-blue-400'></div>
              </div>
            </td>
            <td className='py-2 px-2 col-span-1 text-center'>{`${taskBillableWorkingHours} (${taskWorkingPercent}%)`}</td>
          </tr>
        );
      })
          }
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(TaskTab);
