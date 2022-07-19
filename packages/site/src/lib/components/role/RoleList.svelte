<script lang="ts">
	import RoleCard from '$components/role/RoleCard.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import type { PaginatedRoleDto } from '@self/sdk';
	import { formatDistance } from 'date-fns';
	import Fa6SolidUserPlus from '~icons/fa6-solid/user-plus';

	export let roles: PaginatedRoleDto;
</script>

<StackedList entityTitle="roles" count={roles.results.length}>
	{#each roles.results as role (role.id)}
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
			<RoleCard {role} {icons} />
		</li>
	{/each}
	<div slot="emptyState">
		<EmptyState
			entity="roles"
			message="No members have been invited yet."
			buttonText="Invite member"
		/>
	</div>
	<AnchorPagination pagination={roles.pagination} />
</StackedList>
