<script lang="ts">
	import EmptyState from '$lib/components/EmptyState.svelte';
	import OwnRoleCard from '$lib/components/role/OwnRoleCard.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import type { EntityName } from '$lib/constants/names';
	import type { RoleDto } from '@self/sdk';
	import { formatDistance } from 'date-fns';
	import Fa6SolidUserPlus from '~icons/fa6-solid/user-plus';

	export let roles: RoleDto[];

	const formUrl = '/organizations/new';

	const nameMap: EntityName = {
		idField: 'roleId',
		plural: 'roles',
		pluralCap: 'Roles',
		singular: 'Organization',
		singularCap: 'Role',
		urlName: 'roles',
	};
</script>

<StackedList {nameMap} count={roles.length} {formUrl}>
	{#each roles as role (role.id)}
		{@const icons = [
			{
				label:
					'Added ' +
					formatDistance(role.createdAt, new Date(), {
						addSuffix: true,
					}),
				icon: Fa6SolidUserPlus,
				tooltip: 'createdAt',
			},
		]}
		<li>
			<OwnRoleCard
				{role}
				{icons}
				on:delete={(e) => {
					roles = roles.filter((r) => r.id !== e.detail.id);
				}}
			/>
		</li>
	{/each}
	<div slot="emptyState">
		<EmptyState
			{nameMap}
			message="No roles have been created yet."
			buttonText="Create new organization"
			{formUrl}
		/>
	</div>
</StackedList>
