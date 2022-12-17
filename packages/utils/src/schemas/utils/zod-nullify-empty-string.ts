export const nullifyEmptyString = <T>(arg: T) => {
	if (typeof arg == 'string' && arg.trim().length === 0) {
		return null;
	} else {
		return arg;
	}
};
