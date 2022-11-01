<script lang="ts">
	import { classes } from '$lib/utils/classes';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { IconSource } from '@steeze-ui/svelte-icon/types';

	export let icon: IconSource;
	export let current: boolean;
</script>

<div
	class={classes(
		current
			? 'border-indigo-500 text-indigo-600'
			: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
		'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium',
	)}
	aria-current={current ? 'page' : undefined}
>
	<Icon
		src={icon}
		theme="solid"
		class={classes(
			current ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
			'-ml-0.5 mr-2 h-5 w-5',
		)}
		aria-hidden="true"
	/>
	<slot />
</div>
