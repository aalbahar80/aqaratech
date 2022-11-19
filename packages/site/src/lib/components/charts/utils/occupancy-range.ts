import { startOfMonthN } from '@self/utils';

const previous = {
	start: startOfMonthN(12).substring(0, 10),
	end: new Date().toISOString().substring(0, 10),
};

const future = {
	start: new Date().toISOString().substring(0, 10),
	end: startOfMonthN(-12).substring(0, 10),
};

export const occupancyRange = {
	previous,
	future,
};
