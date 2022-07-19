<script lang="ts">
	import { page } from '$app/stores';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import TenantCard from '$lib/components/tenant/TenantCard.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import { create } from '$lib/utils/route-helpers';
	import type { PaginatedTenantDto } from '@self/sdk';

	export let tenants: PaginatedTenantDto;

	const formUrl = create({
		entity: 'tenants',
		predefined:
			$page.url.pathname.startsWith('/properties') &&
			new Map<string, any>([
				['propertyId', $page.url.pathname.split('/').pop()],
			]),
	});
</script>

<StackedList entityTitle="tenants" count={tenants.results.length} {formUrl}>
	{#each tenants.results as tenant (tenant.id)}
		<li>
			<TenantCard {tenant} />
		</li>
	{/each}
	<AnchorPagination pagination={tenants.pagination} />
</StackedList>
