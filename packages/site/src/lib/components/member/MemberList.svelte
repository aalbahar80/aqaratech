<script lang="ts">
	import { page } from '$app/stores';
	import MemberCard from '$components/member/MemberCard.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import { entityNameMap } from '$lib/constants/names';
	import { create } from '$lib/utils/route-helpers';
	import type { PaginatedRoleDto } from '@self/sdk';
	import { formatDistance } from 'date-fns';
	import Fa6SolidUserPlus from '~icons/fa6-solid/user-plus';

	export let roles: PaginatedRoleDto;

	const formUrl = create({
		entity: 'roles',
		predefined: new Map<string, any>([
			['entity', $page.url.pathname.split('/')[1]],
			['entityId', $page.url.pathname.split('/')[2]],
		]),
	});
</script>

<StackedList entityTitle="members" count={roles.results.length} {formUrl}>
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
			nameMap={entityNameMap.members}
			message="No members have been invited yet."
			buttonText="Invite member"
			{formUrl}
		/>
	</div>
	<AnchorPagination pagination={roles.pagination} />
</StackedList>
