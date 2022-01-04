<script lang="ts">
	import { DataTable } from 'carbon-components-svelte';
	import type { TenantsByIdLocal } from '$generated/graphql';
	import type { DataTableHeader } from 'carbon-components-svelte/types/DataTable/DataTable.svelte';
	export let trx: TenantsByIdLocal['transactions'] | undefined;
	// extract object keys from trx
	let headers: DataTableHeader[];
	if (trx) {
		const headerNames = Object.keys(trx[0]);
		headers = headerNames.map((headerName) => ({
			key: headerName,
			value: headerName,
			sort: false,
		}));
	}
</script>

{#if trx}
	<DataTable {headers} rows={trx} />
{:else}
	TODO: Empty State
{/if}
