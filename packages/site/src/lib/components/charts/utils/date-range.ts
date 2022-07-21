import { subMonths } from 'date-fns';

export const defaultRange = 6;

export const rangeStart = (monthsAgo: number) =>
	subMonths(new Date().setHours(0, 0, 0, 0), monthsAgo).toISOString();
