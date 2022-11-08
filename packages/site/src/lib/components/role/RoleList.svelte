<script lang="ts">
	import type { ValidatedRoleDto } from '$api/openapi';
	import RoleCard from '$lib/components/role/RoleCard.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import { formatDistance } from 'date-fns';
	import Fa6SolidUserPlus from '~icons/fa6-solid/user-plus';

	export let roles: ValidatedRoleDto[];

	const formUrl = '/organizations/new';
</script>

<StackedList
	entity="role"
	count={roles.length}
	message="No roles have been created yet."
	formButtonProps={{
		entity: 'role',
		buttonText: 'Create new organization',
		formUrl,
	}}
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
</StackedList>
