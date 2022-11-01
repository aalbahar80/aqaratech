export const defaultRange = 12;

// start of next month
export const defaultRangeEnd = () => {
	const now = new Date();
	const nextMonth = new Date(
		Date.UTC(now.getFullYear(), now.getMonth() + 1, 1),
	);
	return nextMonth.toISOString();
};

export const clampedDate = (date: string, min: string, max: string) => {
	const d = new Date(date);
	const minDate = new Date(min);
	const maxDate = new Date(max);
	if (d < minDate) {
		return minDate.toISOString();
	}
	if (d > maxDate) {
		return maxDate.toISOString();
	}
	return date;
};

export const getOneYearAgo = () => {
	const now = new Date();
	const oneYearAgo = new Date(
		Date.UTC(now.getFullYear() - 1, now.getMonth(), now.getDate()),
	);
	return oneYearAgo;
};

export const getOneYearLater = () => {
	const now = new Date();
	const oneYearLater = new Date(
		Date.UTC(now.getFullYear() + 1, now.getMonth(), now.getDate()),
	);
	return oneYearLater;
};
