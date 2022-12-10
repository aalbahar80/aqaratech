<script lang="ts">
	import WideTabBarItem from '$lib/components/tabs/WideTabBarItem.svelte';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { ComponentProps } from 'svelte';

	type Tab = ComponentProps<WideTabBarItem>['tab'];

	export let tabs: Tab[];

	$: authorizedTabs = tabs.filter((tab) => {
		const isTenant = $page.data.user?.role?.roleType === 'TENANT';
		if (isTenant) {
			return tab.label !== 'Files';
		} else {
			return true;
		}
	});
</script>

<div>
	<div class="sm:hidden">
		<label for="tabs" class="sr-only">Select a tab</label>
		<!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
		<select
			id="tabs"
			name="tabs"
			class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
			on:change={(e) => {
				// @ts-expect-error it exists
				const url = e.target?.value;
				void goto(url);
			}}
		>
			{#each authorizedTabs as tab}
				<option selected={$page.url.pathname === tab.href} value={tab.href}
					>{tab.label}</option
				>
			{/each}
		</select>
	</div>
	<div class="hidden sm:block">
		<div class="border-b border-gray-200">
			<nav class="-mb-px flex" aria-label="Tabs">
				{#each authorizedTabs as tab}
					<WideTabBarItem {tab} />
				{/each}
			</nav>
		</div>
	</div>
</div>
