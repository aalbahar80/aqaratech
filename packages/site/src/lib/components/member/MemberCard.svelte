<script lang="ts">
	import { api } from '$api';
	import type { RoleDto } from '$api/openapi';
	import Badge from '$lib/components/Badge.svelte';
	import Dropdown from '$lib/components/buttons/Dropdown.svelte';
	import DropdownMenu from '$lib/components/buttons/DropdownMenu.svelte';
	import MenuItemChild from '$lib/components/buttons/MenuItemChild.svelte';
	import MenuItemIcon from '$lib/components/buttons/MenuItemIcon.svelte';
	import { addSuccessToast, handleApiError } from '$lib/stores/toast';
	import { MenuItem } from '@rgossiaux/svelte-headlessui';
	import { createEventDispatcher } from 'svelte';
	import Fa6SolidEnvelope from '~icons/fa6-solid/envelope';
	import Fa6SolidTrashCan from '~icons/fa6-solid/trash-can';
	import HeroiconsSolidMail from '~icons/heroicons-solid/mail';

	export let role: RoleDto;
	export let icons: any[];

	const dispatch = createEventDispatcher<{ delete: { id: string } }>();
</script>

<div class="px-4 py-4 sm:px-6">
	<div class="flex h-12 items-center justify-between">
		<p class="select-all truncate text-sm font-medium text-indigo-600">
			{role.email}
		</p>
		<div class="flex place-items-center space-x-4">
			{#if !role.isAccepted}
				<Badge label="Invited" badgeColor="indigo">
					<Fa6SolidEnvelope class="mr-2 inline" />
				</Badge>
			{/if}
			<Dropdown>
				<div slot="menu">
					<DropdownMenu>
						<MenuItem as="div" let:active>
							<button
								class="w-full"
								on:click={() => {
									api()
										.roles.sendInvite({ id: role.id })
										.then(() => {
											addSuccessToast(
												`A new email invite will be sent to ${role.email}`,
											);
										})
										.catch(handleApiError);
								}}
							>
								<MenuItemChild {active}>
									<MenuItemIcon icon={HeroiconsSolidMail} />
									Resend email
								</MenuItemChild>
							</button>
						</MenuItem>
						<MenuItem as="div" let:active>
							<button
								class="w-full"
								on:click={() => {
									api()
										.roles.remove({ id: role.id })
										.then((id) => {
											dispatch('delete', { id });
											addSuccessToast(`${role.email} has been removed`);
										})
										.catch(handleApiError);
								}}
							>
								<MenuItemChild {active}>
									<MenuItemIcon icon={Fa6SolidTrashCan} />
									Remove
								</MenuItemChild>
							</button>
						</MenuItem>
					</DropdownMenu>
				</div>
			</Dropdown>
		</div>
	</div>
	<div class="mt-2 sm:flex sm:justify-between">
		<div class="sm:flex sm:space-x-4">
			{#each icons as { label, icon, tooltip } (tooltip)}
				{#if label}
					<p class="flex items-center text-sm text-gray-500">
						<svelte:component
							this={icon}
							class="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400"
						/>
						{label}
					</p>
				{/if}
			{/each}
		</div>
	</div>
</div>
