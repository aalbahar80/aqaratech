import { differenceInCalendarDays } from 'date-fns';

export const getProgress = (start: string, end: string, ref?: Date): number => {
	const total = differenceInCalendarDays(new Date(end), new Date(start));
	const left = differenceInCalendarDays(new Date(end), ref ?? new Date());
	const result = left < 1 ? 100 : 100 - (left / total) * 100;
	const rounded = Math.max(0, Math.round(result));
	return rounded;
};
