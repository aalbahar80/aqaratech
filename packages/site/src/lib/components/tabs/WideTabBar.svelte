<script lang="ts">
	import WideTabBarItem from '$lib/components/tabs/WideTabBarItem.svelte';
	import type { ComponentProps } from 'svelte';

	type Tab = ComponentProps<WideTabBarItem>['tab'];

	export let tabs: Tab[];
</script>

<div>
	<div class="sm:hidden">
		<label for="tabs" class="sr-only">Select a tab</label>
		<!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
		<select
			id="tabs"
			name="tabs"
			class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
		>
			<option>My Account</option>

			<option>Company</option>

			<option selected>Team Members</option>

			<option>Billing</option>
		</select>
	</div>
	<div class="hidden sm:block">
		<div class="border-b border-gray-200">
			<nav class="-mb-px flex" aria-label="Tabs">
				{#each tabs as tab}
					<WideTabBarItem {tab} />
				{/each}
			</nav>
		</div>
	</div>
</div>
