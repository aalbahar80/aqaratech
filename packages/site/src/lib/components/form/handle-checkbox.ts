/**
 * Convert HTML checkbox values to booleans.
 *  - HTML checkboxes are:
 *   - unchecked: not present in the form submission
 *   - checked: present in the form submission with value "on"
 *
 * This function mutates the original object.
 */
export const handleCheckboxes = (
	obj: Record<string, unknown>,
	keys: string[],
) => {
	for (const key of keys) {
		if (obj[key] === 'on') {
			obj[key] = true;
		} else {
			obj[key] = false;
		}
	}
};
