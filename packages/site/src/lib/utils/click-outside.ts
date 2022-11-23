/**
 * Emits `clickoutside` event whenever pointer clicks outside of node
 *
 * Reference: https://cs.github.com/bluwy/pick-palette/blob/53847c3e5e6688e0b46854654e4784ad30e52561/src/actions/click-outside.ts?q=export+function+clickOutside%28node%3A+HTMLElement%29+%7B#L6
 */
export function clickOutside(node: HTMLElement) {
	function handleClick(e: MouseEvent) {
		if (
			e.target instanceof Node &&
			!node.contains(e.target) &&
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
