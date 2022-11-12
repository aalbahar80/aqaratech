import { z } from 'zod';

export const stringToNumber = z.string().transform((val) => {
	const num = parseInt(val);

	// don't return NaN, prism will throw an error
	return isNaN(num) ? null : num;
});
