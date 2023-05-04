import React, { useEffect, useState } from 'react';
import { viewProjectTeam } from '../../../../../../../service/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { IGeneralState } from '../../../../../../../interface/interface';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { convertMinutesToHours } from '../../../../../../../utils/convertTime';
import { setProjectViewTeamAction } from '../../../../../../../redux/action/projectAction/action';

interface TeamTabProps {
  id: number
  timeRange: {start: Date | undefined, end: Date | undefined}
}
const TeamTab = ({ id, timeRange }: TeamTabProps): JSX.Element => {
  const dispatch = useDispatch();
  const { teamViewList } = useSelector((state: IGeneralState) => state.projectReducer);
  const [allWorkingTime, setAllWorkingTime] = useState({ allBillableTime: 0, allTotalTime: 0, percent: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const startTimeString = (timeRange.start !== undefined)
    ? timeRange.start.toISOString().slice(0, 10)
    : '';
  const endTimeString = (timeRange.end !== undefined)
    ? timeRange?.end?.toISOString().slice(0, 10)
    : '';

  useEffect(() => {
    const getProjectTeam = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const res = await viewProjectTeam(id, startTimeString, endTimeString);
        dispatch(setProjectViewTeamAction(res?.data?.result));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        const errorMessage = isAxiosError(error)
          ? error.message
          : 'Get team tab fail!';
        toast.error(errorMessage);
      }
    };
    void getProjectTeam();
  }, [endTimeString]);

  useEffect(() => {
    if (teamViewList.length > 0) {
      const allBillableWorkingTime = teamViewList.reduce(
        (total: number, user: { billableWorkingTime: number }) =>
          total + user.billableWorkingTime,
        0
      );

      const allTotalWorkingTime = teamViewList.reduce(
        (total, user) => total + user.totalWorkingTime,
        0);
      setAllWorkingTime({
        allBillableTime: allBillableWorkingTime,
        allTotalTime: allTotalWorkingTime,
        percent: allTotalWorkingTime > 0
          ? (allBillableWorkingTime) / Number(allTotalWorkingTime) * 100
          : 0
      });
    }
  }, [teamViewList]);
  const allBillableWorkingHours = convertMinutesToHours(allWorkingTime.allBillableTime);
  const allTotalWorkingHours = convertMinutesToHours(allWorkingTime.allTotalTime);

  return (
    <div className={`h-72 overflow-y-scroll ${isLoading ? 'cursor-wait opacity-20' : ''}`}>
      <table className='w-full'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='font-medium text-base py-2 px-2 text-start col-span-3'>Name</th>
            <th className='font-medium text-base py-2 px-2 text-start col-span-1'>Hour</th>
            <th className='font-medium text-base py-2 px-2 text-start col-span-3'>Percent (%)</th>
            <th className='font-medium text-base py-2 px-2 text-center col-span-1 truncate'>Billable Hour</th>
          </tr>
        </thead>
        <tbody>
          <tr className='border-b border-gray-300'>
            <td className='py-2 px-2 font-medium text-truncate'>Total</td>
            <td className='py-2 px-2 font-medium text-truncate'>{allTotalWorkingHours}</td>
            <td className='py-2 col-span-2'>
              <div className='h-3 bg-blue-100'>
                <div style={{ width: `${allWorkingTime.percent}%` }} className='h-full bg-blue-400'></div>
              </div>
            </td>
            <td
              className='py-2 px-2 font-medium text-truncate col-span-1 text-center'
            >
              {`${allBillableWorkingHours} (${allWorkingTime.percent.toFixed(0)}%)`}
            </td>
          </tr>
          {
            teamViewList.length > 0 &&
      teamViewList.map((user) => {
        const userWorkingPercent = user.totalWorkingTime > 0
          ? ((user.billableWorkingTime / user.totalWorkingTime) * 100)
          : 0;
        const userBillableWorkingHours = user.billableWorkingTime > 0
          ? convertMinutesToHours(user.totalWorkingTime)
          : '';
        const userTotalWorkingHours = user.totalWorkingTime > 0
          ? convertMinutesToHours(user.totalWorkingTime)
          : '';
        return (
          <tr key={user.userID} className='border-b border-gray-300'>
            <td className='py-2 px-2'>{user.userName}</td>
            <td className='py-2 px-2'>{userTotalWorkingHours}</td>
            <td className='py-2'>
              <div className='h-3 bg-blue-100'>
                <div style={{ width: `${userWorkingPercent.toString()}%` }} className='h-full bg-blue-400'></div>
              </div>
            </td>
            <td className='py-2 px-2 col-span-1 text-center'>{`${userBillableWorkingHours} (${userWorkingPercent.toFixed(0)}%)`}</td>
          </tr>
        );
      })
          }
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(TeamTab);
