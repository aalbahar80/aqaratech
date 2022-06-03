/**
 * Remove tailwind-forms-plugin classes from an input element.
 */
export function formNone(node: HTMLElement) {
	// Remove tailwind form class
	const input = node.querySelector('input');
	if (input) {
		input.removeAttribute('type');
		// input.classList.add('focus:ring-0', 'focus:border-none');
	}
}
