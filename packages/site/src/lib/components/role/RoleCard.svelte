<script lang="ts">
	import { page } from '$app/stores';
	import Badge from '$lib/components/Badge.svelte';
	import DropDown from '$lib/components/DropDown.svelte';
	import { handleApiError } from '$lib/stores/toast';
	import type { RoleDto } from '@self/sdk';
	import { Mail, Trash } from '@steeze-ui/heroicons';
	import Fa6SolidEnvelope from '~icons/fa6-solid/envelope';

	export let role: RoleDto;
	export let icons: any[];

	const isActive = Math.random() >= 0.5;
</script>

<div class="px-4 py-4 sm:px-6">
	<div class="flex h-12 items-center justify-between">
		<p class="truncate text-sm font-medium text-indigo-600">
			{role.email}
		</p>
		{#if !isActive}
			<Badge label="Invited" badgeColor="indigo">
				<Fa6SolidEnvelope class="mr-2 inline" />
			</Badge>
		{/if}
		<DropDown
			options={[
				{
					icon: Mail,
					label: 'Resend email',
					onClick: () => {},
				},
				{
					icon: Trash,
					label: 'Remove',
					onClick: async () => {
						try {
							await $page.stuff.api.roles.remove({ id: role.id });
						} catch (error) {
							await handleApiError(error);
						}
					},
				},
			]}
		/>
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
