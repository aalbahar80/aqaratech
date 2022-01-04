<script lang="ts">
	import { DataTable, Tag, Link } from 'carbon-components-svelte';
	import type { TenantsByIdLocal } from '$generated/graphql';
	import type { DataTableHeader } from 'carbon-components-svelte/types/DataTable/DataTable.svelte';
	import { Launch16, CheckmarkFilled24 } from 'carbon-icons-svelte';
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
	<DataTable {headers} rows={trx}>
		<svelte:fragment slot="cell" let:row let:cell>
			{#if row['is_paid']}
				{#if cell.key === 'is_paid'}
					<CheckmarkFilled24 />
				{:else if cell.key === 'receipt_url'}
					<Link
						icon={Launch16}
						href="https://en.wikipedia.org/wiki/Round-robin_DNS"
						target="_blank">Receipt</Link
					>
				{:else}
					{cell.value}
				{/if}
			{:else}
				{cell.value}
			{/if}
		</svelte:fragment>
	</DataTable>
{:else}
	TODO: Empty State
{/if}
