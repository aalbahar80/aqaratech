<script lang="ts">
	import { session } from '$app/stores';
	import Dropdown from '$lib/components/buttons/Dropdown.svelte';
	import DropdownMenu from '$lib/components/buttons/DropdownMenu.svelte';
	import MenuIconItem from '$lib/components/buttons/MenuIconItem.svelte';
	import { getNavOptions } from '$lib/components/navbar/nav-links';
	import { MenuItem } from '@rgossiaux/svelte-headlessui';
	import { ChevronDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
</script>

<Dropdown>
	<div
		slot="button"
		class="group inline-flex items-center rounded border border-transparent px-4 py-2  text-sm font-medium text-white hover:bg-gray-700"
	>
		<div class="pr-3">
			{#if $session.user}
				<p>{$session.user?.role.organization.fullName}</p>
				<span class="font-medium text-slate-300 group-hover:text-white">
					{$session.user?.role.meta.roleLabel}
				</span>
			{:else}
				<p>Welcome to Aqaratech</p>
			{/if}
		</div>
		<Icon
			src={ChevronDown}
			class="h-5 w-5 text-slate-300 group-hover:text-white"
			aria-hidden="true"
			theme="solid"
		/>
	</div>
	<div slot="menu">
		<DropdownMenu>
			{#each getNavOptions($session.user) as option}
				<MenuItem let:active>
					<a href={option.href}>
						<MenuIconItem {option} {active} />
					</a>
				</MenuItem>
			{/each}
		</DropdownMenu>
	</div>
</Dropdown>
