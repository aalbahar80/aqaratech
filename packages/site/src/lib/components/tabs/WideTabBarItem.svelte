<script lang="ts">
	import { page } from '$app/stores';
	import { classes } from '$lib/utils/classes';

	export let tab: { label: string; href: string };

	$: active = $page.url.pathname === tab.href;
</script>

<a
	href={tab.href}
	class={classes(
		'w-full border-b-2 py-4 px-1 text-center text-sm font-medium',
		active
			? 'border-indigo-500 text-indigo-600'
			: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
	)}
>
	{tab.label}
</a>
