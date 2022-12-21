import type { Locator } from '@playwright/test';

/**
 * Get the selected label of a select element.
 *
 * This *does not* auto wait for the label. Therefore, it is recommended to use
 * `toHaveValue` before calling this function.
 *
 * Example:
 *
 * ```typescript
 * const el = page.getByRole('combobox', { name: 'Property' });
 * await expect(el).toHaveValue('123');
 * expect(await selectedLabel(el)).toBe('My Property');
 * ```
 */
export const selectedLabel = async (loc: Locator) =>
	await loc.evaluate(
		(e: HTMLSelectElement) => e.options[e.selectedIndex]?.innerText,
	);
