<script lang="ts">
	import { createColumnHelper } from '@tanstack/svelte-table';

	import type { PageData } from './$types';

	import type { LeaseDto } from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import LeaseTable from '$lib/components/lease/LeaseTable.svelte';

	export let data: PageData;

	const columnHelper = createColumnHelper<LeaseDto>();
</script>

<LeaseTable
	data={data.leases}
	extraColumns={[
		columnHelper.accessor('breadcrumbs.portfolio.label', {
			id: 'portfolio.fullName', // used for sorting
			header: $L.entity.portfolio.singular(),
		}),
	]}
/>
