import React, { useEffect, useState } from 'react';
import { Select, Modal, Tabs, Button, Tooltip } from 'antd';
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';
import { ISelectOption } from '../../../../../../interface/interface';
import TaskTab from './TaskTab/TaskTab';
import TeamTab from './TeamTab/TeamTab';
import { useGetWeeks } from '../../../../../../hooks/useGetWeek';
import { useGetMonth } from '../../../../../../hooks/useGetMonth';
import { useGetQuarter } from '../../../../../../hooks/useGetQuarter';
import { useGetYears } from '../../../../../../hooks/useGetYear';
import useModal from '../../../../../../hooks/useModal';
import DatePicker from '../../../../../../components/DatePicker/DatePicker';
import dayjs from 'dayjs';
import { optionSelectDates } from '../../../../../../constants/constants';
import { FaTimesCircle } from 'react-icons/fa';
import { BsPencilFill } from 'react-icons/bs';
import { toast } from 'react-toastify';

interface IViewProjectProps {
  isOpenModalViewPrj: boolean
  onSummit?: () => void
  onCloseModal: () => void
  projectID: number
}

const ViewProject = ({ isOpenModalViewPrj, onCloseModal, projectID }: IViewProjectProps): JSX.Element => {
  const [currentOption, setCurrentOption] = useState<ISelectOption>({ value: '0', label: 'Week' });
  const [startDateW, endDateW, goToPreviousWeek, goToNextWeek] = useGetWeeks();
  const [startDateM, endDateM, goToPreviousMonth, goToNextMonth] = useGetMonth();
  const [startDateQ, endDateQ, goToPreviousQuarter, goToNextQuarter] = useGetQuarter();
  const [startDateY, endDateY, goToPreviousYear, goToNextYear] = useGetYears();
  const [currentTime, setCurrentTime] = useState<{ start: Date | undefined, end: Date | undefined }>(
    { start: startDateW, end: endDateW }
  );
  const [customTime, setCustomTime] = useState<{ start: Date | undefined, end: Date | undefined }>(
    { start: startDateW, end: endDateW }
  );
  const [isChangeDate, setIsChangeDate] = useState(false);
  const { isOpenModal, handleToggleModal } = useModal(false);

  const tabsOption = [
    {
      label: 'Team',
      key: '1',
      children: <TeamTab
        id={projectID}
        timeRange={currentTime}
      />
    },
    {
      label: 'Task',
      key: '2',
      children: <TaskTab
        id={projectID}
        timeRange={currentTime}
      />
    }
  ];
  const disable = !!((currentOption.value === '4' || currentOption.value === '5'));

  const handleOptionChange = (option: ISelectOption): void => {
    if (option.value !== currentOption.value) {
      setCurrentOption(option);
    }
  };
  const handlePreviousClick = (): void => {
    if (!disable && currentOption.value !== '5') {
      setIsChangeDate(!isChangeDate);
    }
    if (currentOption.value === '0') {
      goToPreviousWeek();
    } else if (currentOption.value === '1') {
      goToPreviousMonth();
    } else if (currentOption.value === '2') {
      goToPreviousQuarter();
    } else if (currentOption.value === '3') {
      goToPreviousYear();
    }
  };

  const handleNextClick = (): void => {
    if (!disable) {
      setIsChangeDate(!isChangeDate);
    }
    if (currentOption.value === '0') {
      goToNextWeek();
    } else if (currentOption.value === '1') {
      goToNextMonth();
    } else if (currentOption.value === '2') {
      goToNextQuarter();
    } else if (currentOption.value === '3') {
      goToNextYear();
    }
  };
  const handleGetCustomTimeStart = (timeStart: dayjs.Dayjs | null, dateString: string): void => {
    if (timeStart != null) {
      setCustomTime({ ...customTime, start: timeStart.toDate() });
    }
  };
  const handleGetCustomTimeEnd = (timeEnd?: dayjs.Dayjs | null, dateString?: string): void => {
    if (timeEnd != null) {
      setCustomTime({ ...customTime, end: timeEnd.toDate() });
    }
  };
  useEffect(() => {
    switch (currentOption.value) {
      case '0':
        setCurrentTime({ ...currentTime, start: startDateW, end: endDateW });
        break;
      case '1':
        setCurrentTime({ ...currentTime, start: startDateM, end: endDateM });
        break;
      case '2':
        setCurrentTime({ ...currentTime, start: startDateQ, end: endDateQ });
        break;
      case '3':
        setCurrentTime({ ...currentTime, start: startDateY, end: endDateY });
        break;
      case '4':
        setCurrentTime({ ...currentTime, start: undefined, end: undefined });
        break;
      case '5':
        setCustomTime({ ...customTime, start: undefined, end: undefined });
        break;

      default:
        break;
    }
  }, [currentOption, isChangeDate]);

  const handleViewCustomtime = (): void => {
    if (customTime.start === undefined || customTime.end === undefined) {
      toast.error('Dude, try to fill time!');
      return;
    }
    setCurrentTime({ ...currentTime, start: customTime.start, end: customTime.end });
    setCustomTime({ ...customTime, start: undefined, end: undefined });
    handleToggleModal();
  };

  const timeZone = currentOption.value === '4'
    ? 'All time'
    : `${currentTime.start?.toLocaleDateString('en-GB') ?? 'Select time'} - 
    ${currentTime.end?.toLocaleDateString('en-GB') ?? 'Select time'}`;

  return (
    <>
      <Modal
        title="View Project"
        closeIcon={<FaTimesCircle className='w-5 h-5'/>}
        onCancel={onCloseModal}
        open={isOpenModalViewPrj}
        footer={[null]}
      >
        <div className='flex flex-col h-96'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-5 items-center'>
              <div className='flex gap-2'>
                <BiLeftArrow
                  className={`w-10 h-10 p-2 border rounded select-none
                   ${disable ? 'cursor-not-allowed opacity-25' : 'hover:bg-gray-300 cursor-pointer'}`}
                  onClick={handlePreviousClick}
                />
                <BiRightArrow
                  className={`w-10 h-10 p-2 border rounded select-none
                   ${disable ? 'cursor-not-allowed opacity-25' : 'hover:bg-gray-300 cursor-pointer'}`}
                  onClick={handleNextClick}
                />
              </div>
              <div className='flex items-center gap-2'>
                <div className='font-bold select-none'>
                  {timeZone}
                </div>
                <div
                  onClick={handleToggleModal}
                  className='cursor-pointer text-base opacity-80 transition-all
                  hover:scale-150 hover:text-green-550 hover:duration-300'
                  hidden={currentOption.value !== '5'}
                >
                  <Tooltip title='Custom Time' >
                    <BsPencilFill />
                  </Tooltip>
                </div>
              </div>
            </div>
            <Select
              size='middle'
              className='w-32'
              labelInValue
              defaultValue={optionSelectDates[0]}
              value={currentOption}
              onChange={handleOptionChange}
              options={optionSelectDates}
            />
          </div>
          <Tabs
            defaultActiveKey="1"
            items={tabsOption}
          />
        </div>
        <Modal
          title="Custom time"
          open={isOpenModal}
          onCancel={handleToggleModal}
          footer={[
            <Button
              key={'cancel'}
              className='bg-gray-300 hover:bg-white'
              onClick={handleToggleModal}
            >
              Cancel
            </Button>,
            <Button
              className='bg-green-400 hover:bg-white'
              key={'ok'}
              onClick={handleViewCustomtime}
            >
              OK
            </Button>
          ]}
        >
          <div className='flex justify-center'>
            <DatePicker
              valueTimeStart={customTime.start !== undefined ? dayjs(customTime.start) : undefined}
              valueTimeEnd={customTime.end !== undefined ? dayjs(customTime.end) : undefined}
              onTimeStartChange={handleGetCustomTimeStart}
              onTimeEndChange={handleGetCustomTimeEnd}
            />
          </div>
        </Modal>

        <style>
          {`
      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-track {
        background-color: #f1f1f1;
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: rgba(0,0,0,0.2);
      }
      .ant-tooltip-inner {
        color: yellow;
        background-color: green;
        width: 100px;
      }
    `}
        </style>
      </Modal>
    </>
  );
};

export default ViewProject;
