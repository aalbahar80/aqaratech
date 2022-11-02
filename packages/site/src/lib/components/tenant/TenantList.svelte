<script lang="ts">
	import type { PaginatedTenantDto } from '$api/openapi';
	import { page } from '$app/stores';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import TenantCard from '$lib/components/tenant/TenantCard.svelte';
	import { orgRoute } from '$lib/utils/route-helpers';

	export let tenants: PaginatedTenantDto;
</script>

<StackedList
	entity="tenant"
	count={tenants.results.length}
	formUrl={`${orgRoute($page.params)}/tenants/new`}
>
	{#each tenants.results as tenant (tenant.id)}
		<li>
			<TenantCard {tenant} />
		</li>
	{/each}
	<AnchorPagination pagination={tenants.pagination} />
</StackedList>
