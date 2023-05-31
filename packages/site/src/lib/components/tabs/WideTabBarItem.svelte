<script lang="ts">
	import { page } from '$app/stores';

	import type { RoleDto } from '$api/openapi';
	import type { Icon } from '$lib/models/types/icon.type';

	import { classes } from '$lib/utils/classes';

	export let tab: {
		label: string;
		href: string;
		isExternal?: boolean;
		/** If the tab is only visible to users with the given roles. */
		roles?: RoleDto['roleType'][];
		icon?: Icon;
	};

	$: active = $page.url.pathname === tab.href;
</script>

<a
	data-testid={active ? 'active' : 'inactive'}
	href={tab.href}
	class={classes(
		'flex w-full border-b-2 px-1 py-4 text-center text-sm font-medium',
		active
			? 'border-indigo-500 text-indigo-600'
			: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
	)}
	data-sveltekit-reload={'isExternal' in tab && tab.isExternal ? '' : 'off'}
	rel={tab.isExternal ? 'external' : undefined}
>
	<div class="grow">
		{tab.label}
	</div>
	{#if tab.icon}
		<svelte:component
			this={tab.icon}
			class="h-5 w-5 rtl:-scale-x-100"
		/>
	{/if}
</a>
