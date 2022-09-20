<script lang="ts">
	import EmptyState from '$lib/components/EmptyState.svelte';
	import RoleCard from '$lib/components/role/RoleCard.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import type { ValidatedRoleDto } from '$api/openapi';
	import { entitiesMap } from '@self/utils';
	import { formatDistance } from 'date-fns';
	import Fa6SolidUserPlus from '~icons/fa6-solid/user-plus';

	export let roles: ValidatedRoleDto[];

	const formUrl = '/organizations/new';
</script>

<StackedList
	entityMap={entitiesMap.role}
	count={roles.length}
	{formUrl}
	hideActions={false}
>
	{#each roles as role (role.id)}
		{@const icons = [
			{
				label:
					'Added ' +
					formatDistance(new Date(role.createdAt), new Date(), {
						addSuffix: true,
					}),
				icon: Fa6SolidUserPlus,
				tooltip: 'createdAt',
			},
		]}
		<li>
			<RoleCard
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
			entityMap={entitiesMap.role}
			message="No roles have been created yet."
			buttonText="Create new organization"
			{formUrl}
		/>
	</div>
</StackedList>
