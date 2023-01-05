export const addDays = (date: Date, days: number) => {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + days);
	return newDate;
};
