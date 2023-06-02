<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { ComponentProps } from 'svelte';

	import WideTabBarItem from '$lib/components/tabs/WideTabBarItem.svelte';

	type Tab = ComponentProps<WideTabBarItem>['tab'];

	export let tabs: Tab[];

	$: authorizedTabs = tabs.filter((tab) => {
		const isAuthorized = tab.roles
			? tab.roles.some((role) => role === $page.data.user?.role?.roleType)
			: true;

		return isAuthorized;
	});
</script>

<div
	class:hidden={$page.url.pathname.includes('/new') ||
		$page.url.pathname.includes('/edit') ||
		$page.url.pathname.includes('/contract')}
>
	<div class="print:hidden sm:hidden">
		<label
			for="tabs"
			class="sr-only">Select a tab</label
		>
		<select
			id="tabs"
			name="tabs"
			class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
			on:change={(e) => {
				// @ts-expect-error it exists
				const url = e.target?.value;
				const isExternal = tabs.find((tab) => tab.href === url)?.isExternal;
				isExternal ? (window.location = url) : void goto(url);
			}}
		>
			{#each authorizedTabs as tab}
				<option
					selected={$page.url.pathname === tab.href}
					value={tab.href}>{tab.label}</option
				>
			{/each}
		</select>
	</div>
	<div class="hidden sm:block">
		<div class="border-b border-gray-200">
			<nav
				class="-mb-px flex print:hidden"
				aria-label="Tabs"
			>
				{#each authorizedTabs as tab}
					<WideTabBarItem {tab} />
				{/each}
			</nav>
		</div>
	</div>
</div>
