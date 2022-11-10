<script lang="ts">
	import type { PaginatedRoleDto } from '$api/openapi';
	import { page } from '$app/stores';
	import MemberCard from '$components/member/MemberCard.svelte';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import { getFormRouteWithRelation } from '$lib/utils/file';
	import { formatDistance } from 'date-fns';
	import Fa6SolidUserPlus from '~icons/fa6-solid/user-plus';

	export let roles: PaginatedRoleDto;
</script>

<StackedList
	entity="member"
	count={roles.results.length}
	formButtonProps={{
		entity: 'member',
		buttonText: 'Invite member',
		formUrl: getFormRouteWithRelation(
			'member',
			$page.url.pathname,
			$page.params,
		),
	}}
>
	{#each roles.results as role (role.id)}
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
			<MemberCard
				{role}
				{icons}
				on:delete={(e) => {
					roles.results = roles.results.filter((r) => r.id !== e.detail.id);
				}}
			/>
		</li>
	{/each}
	<AnchorPagination pagination={roles.pagination} />
</StackedList>
