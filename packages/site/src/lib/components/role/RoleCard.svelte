<script lang="ts">
	import Badge from '$lib/components/Badge.svelte';
	import { getRoleMeta } from '$lib/utils/get-role-meta';
	import type { ValidatedRoleDto } from '$api/openapi';
	import BxsBusiness from '~icons/bxs/business';
	import MdiAccount from '~icons/mdi/account';
	import MdiAccountTie from '~icons/mdi/account-tie';

	export let role: ValidatedRoleDto;
	export let icons: any[];

	const meta = getRoleMeta(role);
</script>

<a href={`/auth/roles/${role.id}`} class="block hover:bg-gray-50">
	<div class="px-4 py-4 sm:px-6">
		<div class="flex h-12 items-center justify-between">
			<p class="select-all truncate text-sm font-medium text-indigo-600">
				{role.organization.title}
			</p>
			<div class="flex place-items-center space-x-4">
				{#if role.roleType === 'ORGADMIN'}
					<Badge label={meta.roleLabel} badgeColor="indigo">
						<BxsBusiness class="mr-2 inline" />
					</Badge>
				{:else if role.roleType === 'PORTFOLIO'}
					<Badge label={meta.roleLabel} badgeColor="indigo">
						<MdiAccountTie class="mr-2 inline" />
					</Badge>
				{:else if role.roleType === 'TENANT'}
					<Badge label={meta.roleLabel} badgeColor="indigo">
						<MdiAccount class="mr-2 inline" />
					</Badge>
				{/if}
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
</a>
