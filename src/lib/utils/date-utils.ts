import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

export const getProgress = (start: Date, end: Date, ref?: Date): number => {
	const total = differenceInCalendarDays(end, start);
	const left = differenceInCalendarDays(end, ref ?? new Date());
	const result = left < 1 ? 100 : 100 - (left / total) * 100;
	const rounded = Math.round(result);
	return rounded;
};
