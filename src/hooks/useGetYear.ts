import { useState, useCallback } from 'react';

export const useGetYears = (): [Date, Date, () => void, () => void] => {
  const now = new Date();
  const yearStartDateY = new Date(now.getFullYear(), 0, 1);
  const yearEndDateY = new Date(now.getFullYear(), 11, 31);
  const [startDateY, setStartDateY] = useState<Date>(yearStartDateY);
  const [endDateY, setEndDateY] = useState<Date>(yearEndDateY);

  const goToPreviousYear = (): void => {
    const newYearStartDateY = new Date(startDateY);
    newYearStartDateY.setFullYear(newYearStartDateY.getFullYear() - 1);
    setStartDateY(newYearStartDateY);
    setEndDateY(new Date(newYearStartDateY.getFullYear(), 11, 31));
  };

  const goToNextYear = useCallback(() => {
    const newYearStartDateY = new Date(startDateY);
    newYearStartDateY.setFullYear(newYearStartDateY.getFullYear() + 1);
    setStartDateY(newYearStartDateY);
    setEndDateY(new Date(newYearStartDateY.getFullYear(), 11, 31));
  }, [startDateY]);

  return [startDateY, endDateY, goToPreviousYear, goToNextYear];
};
