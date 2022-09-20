<!-- <script lang="ts">
	import { page } from '$app/stores';
	import OrganizationCard from '$lib/components/organization/OrganizationCard.svelte';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import { create } from '$lib/utils/route-helpers';
	import type { PaginatedOrganizationDto } from '$api/openapi';

	export let organizations: PaginatedOrganizationDto;

	const formUrl = create({
		entity: 'organizations',
		predefined:
			$page.url.pathname.startsWith('/properties') &&
			new Map<string, any>([
				['propertyId', $page.url.pathname.split('/').pop()],
			]),
	});
</script>

<StackedList
	entity="organization"
	count={organizations.results.length}
	{formUrl}
>
	{#each organizations.results as organization (organization.id)}
		<li>
			<OrganizationCard {organization} />
		</li>
	{/each}
	<AnchorPagination pagination={organizations.pagination} />
</StackedList> -->
