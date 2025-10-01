import dayjs, { Dayjs } from 'dayjs';
import { create } from 'zustand';

interface TimePeriod {
    dateString: string
    dateDayjs: Dayjs
    setDate: (newDate: string) => void
}

export const useTimePeriod = create<TimePeriod>()(
  (set) => ({
    dateString: '2025-05-30',

    dateDayjs: dayjs('2025-05-30'),

    setDate: (newDate) => set({ dateString: newDate, dateDayjs: dayjs(newDate) }),
  }),
);
