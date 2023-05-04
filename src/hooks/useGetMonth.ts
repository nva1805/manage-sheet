import { useState, useCallback } from 'react';

export const useGetMonth = (): [Date, Date, () => void, () => void] => {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const [startDateM, setStartDateM] = useState<Date>(firstDayOfMonth);
  const [endDateM, setEndDateM] = useState<Date>(lastDayOfMonth);

  const goToPreviousMonth = (): void => {
    const newFirstDayOfMonth = new Date(startDateM);
    newFirstDayOfMonth.setMonth(startDateM.getMonth() - 1);
    setStartDateM(newFirstDayOfMonth);
    setEndDateM(new Date(newFirstDayOfMonth.getFullYear(), newFirstDayOfMonth.getMonth() + 1, 0));
  };

  const goToNextMonth = useCallback(() => {
    const newFirstDayOfMonth = new Date(startDateM);
    newFirstDayOfMonth.setMonth(startDateM.getMonth() + 1);
    setStartDateM(newFirstDayOfMonth);
    setEndDateM(new Date(newFirstDayOfMonth.getFullYear(), newFirstDayOfMonth.getMonth() + 1, 0));
  }, [startDateM]);

  return [startDateM, endDateM, goToPreviousMonth, goToNextMonth];
};
