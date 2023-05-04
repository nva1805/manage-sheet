import { useState, useCallback } from 'react';

export const useGetQuarter = (): [Date, Date, () => void, () => void] => {
  const now = new Date();
  const quarterStartMonth = Math.floor(now.getMonth() / 3) * 3;
  const quarterStartDateQ = new Date(now.getFullYear(), quarterStartMonth, 1);
  const quarterEndDate = new Date(quarterStartDateQ.getFullYear(), quarterStartDateQ.getMonth() + 3, 0);
  const [startDateQ, setStartDateQ] = useState<Date>(quarterStartDateQ);
  const [endDate, setEndDate] = useState<Date>(quarterEndDate);

  const goToPreviousQuarter = (): void => {
    const newQuarterStartDateQ = new Date(startDateQ);
    newQuarterStartDateQ.setMonth(newQuarterStartDateQ.getMonth() - 3);
    setStartDateQ(newQuarterStartDateQ);
    setEndDate(new Date(newQuarterStartDateQ.getFullYear(), newQuarterStartDateQ.getMonth() + 3, 0));
  };

  const goToNextQuarter = useCallback(() => {
    const newQuarterStartDateQ = new Date(startDateQ);
    newQuarterStartDateQ.setMonth(newQuarterStartDateQ.getMonth() + 3);
    setStartDateQ(newQuarterStartDateQ);
    setEndDate(new Date(newQuarterStartDateQ.getFullYear(), newQuarterStartDateQ.getMonth() + 3, 0));
  }, [startDateQ]);

  return [startDateQ, endDate, goToPreviousQuarter, goToNextQuarter];
};
