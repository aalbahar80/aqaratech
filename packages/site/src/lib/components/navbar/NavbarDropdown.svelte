<script lang="ts">
	import { dev } from '$app/env';
	import { session } from '$app/stores';
	import Dropdown from '$lib/components/buttons/Dropdown.svelte';
	import DropdownMenu from '$lib/components/buttons/DropdownMenu.svelte';
	import MenuIconItem from '$lib/components/buttons/MenuIconItem.svelte';
	import { getDocs } from '$lib/components/navbar/docs-url';
	import { LOGOUT } from '$lib/constants/routes';
	import type { MenuOption } from '$lib/models/interfaces/option.interface';
	import { MenuItem } from '@rgossiaux/svelte-headlessui';
	import {
		ChevronDown,
		Code,
		InformationCircle,
		Logout,
	} from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	const docs = getDocs();

	const getRoleOptions = (user: App.Session['user']): MenuOption[] =>
		user?.roles.map((role) => ({
			href: `/auth/roles/${role.id}`,
			label: `${role.organization.fullName} : ${role.meta.roleLabel}`,
		})) || [];

	const options = [
		...getRoleOptions($session.user),
		...(dev ? [{ label: 'Debug', href: '/debug', icon: Code }] : []),
		// { label: 'Settings', href: '#', icon: Cog },
		{ label: 'Docs', href: docs, icon: InformationCircle }, // TODO: open in new tab { target="_blank" } & sveltekit:reload
		{ label: 'Logout', href: LOGOUT, icon: Logout }, // sveltekit:reload?
	];
</script>

<Dropdown>
	<div
		slot="button"
		class="group inline-flex items-center rounded border border-transparent px-4 py-2  text-sm font-medium text-white hover:bg-gray-700"
	>
		<div class="pr-3">
			<p>{$session.user?.role.organization.fullName}</p>
			<span class="font-medium text-slate-300 group-hover:text-white">
				{$session.user?.role.meta.roleLabel}
			</span>
		</div>
		<Icon
			src={ChevronDown}
			class="h-5 w-5 text-slate-300 group-hover:text-white"
			aria-hidden="true"
			theme="solid"
		/>
	</div>
	<div slot="menu">
		<DropdownMenu class="z-10">
			{#each options as option}
				<MenuItem let:active>
					<a href={option.href} sveltekit:reload>
						<MenuIconItem {option} {active} />
					</a>
				</MenuItem>
			{/each}
		</DropdownMenu>
	</div>
</Dropdown>
