import { z } from 'zod';

const onToTrue = (arg: unknown) => {
	if (arg === 'on') {
		return true;
	} else {
		return arg;
	}
};

/**
 * Identical to `z.boolean().default(false)`, except for the following behavior:
 *
 *   - `"on"` is converted to `true` _before_ parsing
 *
 * Otherwise, the value will be passed through unchanged.
 *
 * This is useful for HTML checkboxes.
 */
export const zodCheckbox = z.preprocess(onToTrue, z.boolean().default(false));
