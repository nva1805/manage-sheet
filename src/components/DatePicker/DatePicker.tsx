import React, { useState, useCallback } from 'react';
import { DatePicker as AntDatePicker, DatePickerProps } from 'antd';
import dayjs from 'dayjs';

interface DayPickerProps {
  name?: string
  valueTimeStart?: dayjs.Dayjs
  valueTimeEnd?: dayjs.Dayjs
  onTimeStartChange?: (timeStart: dayjs.Dayjs | null, dateString: string) => void
  onTimeEndChange?: (timeEnd?: dayjs.Dayjs | null, dateString?: string) => void
  onTimeStartBlur?: (value: string) => void
}

const DatePicker = (props: DayPickerProps): JSX.Element => {
  const { name, valueTimeStart, valueTimeEnd, onTimeStartChange, onTimeEndChange, onTimeStartBlur } = props;
  const [timeStart, setTimeStart] = useState<dayjs.Dayjs | null>(null);
  // const [timeEnd, setTimeEnd] = useState<dayjs.Dayjs | null>(null);

  // console.log(timeEnd);

  const onChangeStart: DatePickerProps['onChange'] = (date, dateString) => {
    setTimeStart(date);
    onTimeStartChange?.(date, dateString);
  };
  const onChangEnd: DatePickerProps['onChange'] = useCallback(
    (date: dayjs.Dayjs | null, dateString: string) => {
      // setTimeEnd(date);
      onTimeEndChange?.(date, dateString);
    }, [timeStart]);
  const handleTimeStartBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (onTimeStartBlur != null) {
      onTimeStartBlur(e.target.value);
    }
  };

  const disabledStartDate = (current: dayjs.Dayjs | undefined): boolean => {
    if (current === undefined || ((valueTimeEnd?.valueOf()) == null)) {
      return false;
    } else if ((valueTimeEnd?.valueOf()) !== null) {
      return current > valueTimeEnd.startOf('day');
    }
    return current > valueTimeEnd.startOf('day');
  };

  const disabledEndDate = (current: dayjs.Dayjs | undefined): boolean => {
    if (current === undefined || ((valueTimeStart?.valueOf()) == null)) {
      return true;
    } else if ((valueTimeStart?.valueOf()) !== null) {
      return current < valueTimeStart.startOf('day');
    }
    return current < valueTimeStart.startOf('day');
  };

  return <div className='flex gap-4 flex-wrap items-center'>
    <AntDatePicker
      size='large'
      name={name}
      value={valueTimeStart}
      placeholder='Start time...'
      format={'DD/MM/YYYY'}
      onBlur={handleTimeStartBlur}
      onChange={onChangeStart}
      disabledDate={disabledStartDate}
    />
    <span>to</span>
    <AntDatePicker
      size='large'
      placeholder='End time...'
      format={'DD/MM/YYYY'}
      className='p-2'
      value={(valueTimeEnd === undefined || valueTimeEnd === null || Number.isNaN(valueTimeEnd.valueOf())) ? undefined : valueTimeEnd}
      onChange={onChangEnd}
      disabledDate={disabledEndDate}
    />
  </div>;
};
export default DatePicker;
