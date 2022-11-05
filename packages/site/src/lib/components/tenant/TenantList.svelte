<script lang="ts">
	import type { PaginatedTenantDto } from '$api/openapi';
	import { page } from '$app/stores';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import TenantCard from '$lib/components/tenant/TenantCard.svelte';
	import { getRoute, PageType } from '@self/utils';

	export let tenants: PaginatedTenantDto;
</script>

<StackedList
	entity="tenant"
	count={tenants.results.length}
	formUrl={getRoute({
		entity: 'tenant',
		pageType: PageType.New,
		params: $page.params,
	})}
>
	{#each tenants.results as tenant (tenant.id)}
		<li>
			<TenantCard {tenant} />
		</li>
	{/each}
	<AnchorPagination pagination={tenants.pagination} />
</StackedList>
