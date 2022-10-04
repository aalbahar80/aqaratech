<script lang="ts">
	import Dropdown from '$lib/components/buttons/Dropdown.svelte';
	import DropdownMenu from '$lib/components/buttons/DropdownMenu.svelte';
	import MenuItemChild from '$lib/components/buttons/MenuItemChild.svelte';
	import MenuItemIcon from '$lib/components/buttons/MenuItemIcon.svelte';
	import { getNavOptions } from '$lib/components/navbar/nav-links';
	import type { User } from '$lib/models/types/auth.type';
	import { MenuItem } from '@rgossiaux/svelte-headlessui';
	import { ChevronDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let user: User;
</script>

<Dropdown>
	<div
		slot="button"
		class="group inline-flex items-center rounded border border-transparent px-4 py-2  text-sm font-medium text-white hover:bg-gray-700"
	>
		<div class="pr-3">
			{#if user.role}
				<p>{user.role?.organization.title}</p>
				<span class="font-medium text-slate-300 group-hover:text-white">
					{user.role?.meta.roleLabel}
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
			{#each getNavOptions(user) as option}
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
