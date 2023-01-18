<script lang="ts">
	import { page } from '$app/stores';

	import type { RoleDto } from '$api/openapi';

	import { classes } from '$lib/utils/classes';
	import HeroiconsArrowTopRightOnSquareSolid from '~icons/heroicons/arrow-top-right-on-square-solid';

	export let tab: {
		label: string;
		href: string;
		isExternal?: boolean;
		/** If the tab is only visible to users with the given roles. */
		roles?: RoleDto['roleType'][];
	};

	$: active = $page.url.pathname === tab.href;
</script>

<a
	data-testid={active ? 'active' : 'inactive'}
	href={tab.href}
	class={classes(
		'flex w-full border-b-2 py-4 px-1 text-center text-sm font-medium',
		active
			? 'border-indigo-500 text-indigo-600'
			: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
	)}
>
	<div class="grow">
		{tab.label}
	</div>
	{#if tab.isExternal}
		<HeroiconsArrowTopRightOnSquareSolid class="h-5 w-5" />
	{/if}
</a>
