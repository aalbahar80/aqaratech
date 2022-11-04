import { startOfMonthN } from '@self/utils';

const previous = {
	start: startOfMonthN(12).split('T')[0],
	end: new Date().toISOString().split('T')[0],
};

const future = {
	start: startOfMonthN(12).split('T')[0],
	end: new Date().toISOString().split('T')[0],
};

export const occupancyRange = {
	previous,
	future,
};
