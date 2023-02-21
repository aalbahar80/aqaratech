import { SIDEBAR_TOGGLE } from '$lib/constants/misc';

/**
 * Emits `clickoutside` event whenever pointer clicks outside of node
 *
 * Reference: https://cs.github.com/bluwy/pick-palette/blob/53847c3e5e6688e0b46854654e4784ad30e52561/src/actions/click-outside.ts?q=export+function+clickOutside%28node%3A+HTMLElement%29+%7B#L6
 */
export function clickOutside(node: HTMLElement) {
	function handleClick(e: MouseEvent) {
		if (
			e.target instanceof HTMLElement &&
			!node.contains(e.target) &&
			// don't emit if the click was on the toggle button (id="sidebar-toggle")
			e.target.id !== SIDEBAR_TOGGLE &&
			!e.defaultPrevented
		) {
			node.dispatchEvent(new MouseEvent('outclick', e));
		}
	}

	document.addEventListener('click', handleClick);

	return {
		destroy() {
			document.removeEventListener('click', handleClick);
		},
	};
}
