export const nullifyEmptyString = (arg: unknown) => {
	if (typeof arg == 'string' && arg.trim().length === 0) {
		return null;
	} else {
		return arg;
	}
};
