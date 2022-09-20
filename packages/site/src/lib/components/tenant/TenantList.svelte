<script lang="ts">
	import { page } from '$app/stores';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import TenantCard from '$lib/components/tenant/TenantCard.svelte';
	import { create } from '$lib/utils/route-helpers';
	import type { PaginatedTenantDto } from '$api/openapi';

	export let tenants: PaginatedTenantDto;
</script>

<StackedList
	entity="tenant"
	count={tenants.results.length}
	formUrl={create({
		entity: 'tenant',
		predefined:
			$page.url.pathname.startsWith('/properties') &&
			new Map([['propertyId', $page.url.pathname.split('/').pop()]]),
	})}
>
	{#each tenants.results as tenant (tenant.id)}
		<li>
			<TenantCard {tenant} />
		</li>
	{/each}
	<AnchorPagination pagination={tenants.pagination} />
</StackedList>
