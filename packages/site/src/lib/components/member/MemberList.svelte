<script lang="ts">
	import { page } from '$app/stores';
	import MemberCard from '$components/member/MemberCard.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import { create, inferRoute } from '$lib/utils/route-helpers';
	import type { PaginatedRoleDto } from '$api/openapi';
	import { entitiesMap } from '@self/utils';
	import { formatDistance } from 'date-fns';
	import Fa6SolidUserPlus from '~icons/fa6-solid/user-plus';

	export let roles: PaginatedRoleDto;

	$: route = inferRoute($page.url.pathname);
	$: formUrl = create({
		entity: 'role',
		predefined: new Map<string, any>([
			['entity', route.entity.title],
			['entityId', route.id],
		]),
	});
</script>

<StackedList entity="member" count={roles.results.length} {formUrl}>
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
	<div slot="emptyState">
		<EmptyState
			entityMap={entitiesMap.member}
			message="No members have been invited yet."
			buttonText="Invite member"
			{formUrl}
		/>
	</div>
	<AnchorPagination pagination={roles.pagination} />
</StackedList>
