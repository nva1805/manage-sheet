import { useState, useCallback } from 'react';

export const useGetWeeks = (): [Date, Date, () => void, () => void] => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - dayOfWeek + 1);
  const [startDateW, setStartDateW] = useState<Date>(monday);

  const sunday = new Date(startDateW);
  sunday.setDate(startDateW.getDate() + 6);
  const [endDateW, setEndDateW] = useState<Date>(sunday);

  const goToPreviousWeek = (): void => {
    const newMonday = new Date(startDateW);
    setStartDateW(new Date(newMonday.setDate(startDateW.getDate() - 7)));
    setEndDateW(new Date(newMonday.setDate(newMonday.getDate() + 6)));
  };

  const goToNextWeek = useCallback(() => {
    const newMonday = new Date(startDateW);
    setStartDateW(new Date(newMonday.setDate(startDateW.getDate() + 7)));
    setEndDateW(new Date(newMonday.setDate(newMonday.getDate() + 6)));
  }, [startDateW]);

  return [startDateW, endDateW, goToPreviousWeek, goToNextWeek];
};
