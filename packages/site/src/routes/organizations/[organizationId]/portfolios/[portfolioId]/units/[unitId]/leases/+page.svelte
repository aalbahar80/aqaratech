<script lang="ts">
	import LeaseList from '$lib/components/lease/LeaseList.svelte';
	import { create } from '$lib/utils/route-helpers';
	import type { PageData } from './types';

	export let data: PageData;
</script>

<LeaseList
	leases={data.leases}
	formUrl={(function () {
		const base = create({ entity: 'lease' });
		const searchParams = new URLSearchParams({
			portfolioId: data.unit.breadcrumbs.portfolio.id,
			propertyId: data.unit.propertyId,
			unitId: data.unit.id,
		});
		return `${base}?${searchParams.toString()}`;
	})()}
	showIndex
/>
