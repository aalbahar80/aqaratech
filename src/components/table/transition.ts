import type { TransitionConfig } from 'svelte/types/runtime/transition';

export const flash = (
	node: HTMLElement,
	{ duration }: { duration: number },
): TransitionConfig => {
	node.classList.add(
		'bg-green-200',
		'animate-pulse',
		'bg-clip-border',
		'rounded-lg',
	);

	return {
		duration,
		tick: (t: number) => {
			if (t === 1) {
				node.classList.remove(
					'bg-green-200',
					'animate-pulse',
					'bg-clip-border',
					'rounded-lg',
				);
			}
		},
	};
};
