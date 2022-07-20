<script lang="ts">
	import { page } from '$app/stores';
	import Badge from '$lib/components/Badge.svelte';
	import DropDown from '$lib/components/DropDown.svelte';
	import { addSuccessToast, handleApiError } from '$lib/stores/toast';
	import type { RoleDto } from '@self/sdk';
	import { Mail, Trash } from '@steeze-ui/heroicons';
	import { createEventDispatcher } from 'svelte';
	import Fa6SolidEnvelope from '~icons/fa6-solid/envelope';

	export let role: RoleDto;
	export let icons: any[];

	const dispatch = createEventDispatcher<{ delete: { id: string } }>();
</script>

<div class="px-4 py-4 sm:px-6">
	<div class="flex h-12 items-center justify-between">
		<p class="truncate text-sm font-medium text-indigo-600">
			{role.email}
		</p>
		<div class="flex place-items-center space-x-4">
			{#if !role.isAccepted}
				<Badge label="Invited" badgeColor="indigo">
					<Fa6SolidEnvelope class="mr-2 inline" />
				</Badge>
			{/if}
			<DropDown
				options={[
					{
						icon: Mail,
						label: 'Resend email',
						onClick: () => {
							$page.stuff.api.roles
								.sendInvite({ id: role.id })
								.then(() => {
									addSuccessToast(
										`A new email invite will be sent to ${role.email}`,
									);
								})
								.catch(handleApiError);
						},
					},
					{
						icon: Trash,
						label: 'Remove',
						onClick: () => {
							$page.stuff.api.roles
								.remove({ id: role.id })
								.then((id) => {
									dispatch('delete', { id });
									addSuccessToast(`${role.email} has been removed`);
								})
								.catch(handleApiError);
						},
					},
				]}
			/>
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
