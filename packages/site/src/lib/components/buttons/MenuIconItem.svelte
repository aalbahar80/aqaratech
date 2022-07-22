<script lang="ts">
	import { classes } from '$lib/utils/classes';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { IconSource } from '@steeze-ui/svelte-icon/types';

	interface MenuOption {
		label: string;
		icon?: IconSource;
	}

	export let option: MenuOption;
	export let active: boolean;
</script>

<div
	class={classes(
		active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
		'group flex items-center px-4 py-2 text-sm',
	)}
>
	{#if option.icon}
		<Icon
			src={option.icon}
			class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
			aria-hidden="true"
			theme="solid"
		/>
	{/if}
	{option.label}
</div>
