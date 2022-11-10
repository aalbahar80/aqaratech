export const startCase = (str: string): string =>
	str.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
		return str.toUpperCase();
	});
