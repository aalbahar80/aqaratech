export const defaultRange = 12;

export const getOneYearAgo = () => {
	const now = new Date();
	const oneYearAgo = new Date(
		Date.UTC(now.getFullYear() - 1, now.getMonth(), now.getDate()),
	);
	return oneYearAgo;
};
