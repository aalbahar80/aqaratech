<script lang="ts">
	import { page } from '$app/stores';
	import Dropdown from '$lib/components/buttons/Dropdown.svelte';
	import DropdownMenu from '$lib/components/buttons/DropdownMenu.svelte';
	import MenuItemChild from '$lib/components/buttons/MenuItemChild.svelte';
	import MenuItemIcon from '$lib/components/buttons/MenuItemIcon.svelte';
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
			{#if $page.data.user?.role}
				<p>{$page.data.user?.role?.organization.title}</p>
				<span class="font-medium text-slate-300 group-hover:text-white">
					{$page.data.user?.role?.meta.roleLabel}
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
			{#each getNavOptions($page.data.user) as option}
				<MenuItem as="div" let:active>
					<a href={option.href} data-sveltekit-reload>
						<MenuItemChild {active}>
							<MenuItemIcon icon={option.icon} />
							{option.label}
						</MenuItemChild>
					</a>
				</MenuItem>
			{/each}
		</DropdownMenu>
	</div>
</Dropdown>
