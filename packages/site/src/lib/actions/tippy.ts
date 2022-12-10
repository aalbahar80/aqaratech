import tippy, { type Content } from 'tippy.js';

export function tippyHint(
	node: HTMLElement,
	parameters: { content: Content; enabled?: boolean; placement?: string },
) {
	if (!parameters.content || parameters.enabled === false) {
		return;
	}
	const instance = tippy(node, {
		content: parameters.content,
	});
	return {
		destroy() {
			instance.destroy();
		},
	};
}
