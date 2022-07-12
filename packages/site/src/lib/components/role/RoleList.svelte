<script lang="ts">
	import { page } from '$app/stores';
	import RoleCard from '$components/role/RoleCard.svelte';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import type { PaginatedRoleDto } from '@self/sdk';
	import { formatDistance } from 'date-fns';
	import Fa6SolidUserPlus from '~icons/fa6-solid/user-plus';

	export let roles: PaginatedRoleDto;
	console.log({ roles }, 'RoleList.svelte ~ 13');

	const createHref = $page.url.pathname.startsWith('/properties')
		? `/new/roles?propertyId=${$page.url.pathname.split('/').pop()}`
		: '/new/roles';
</script>

<StackedList entityTitle="roles" count={roles.results.length} {createHref}>
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
	<AnchorPagination pagination={roles.pagination} />
</StackedList>
