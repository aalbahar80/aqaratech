<script lang="ts">
	import Checked from '$components/indicators/Checked.svelte';
	import Unchecked from '$components/indicators/Unchecked.svelte';
	import { format, parseISO } from 'date-fns';

	export let trx: TenantIdScreen['transactions'] | undefined;
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

	const fdate = (date: string) => {
		const d = parseISO(date);
		return format(d, 'MMM yy');
	};
</script>

{#if trx}
	<DataTable {headers} rows={trx}>
		<svelte:fragment slot="cell" let:row let:cell>
			{#if cell.key === 'is_paid'}
				{#if cell.value}
					<Checked />
				{:else}
					<Unchecked />
				{/if}
			{:else if cell.key === 'receipt_url'}
				{#if row.is_paid}
					<Link icon={Launch16} href={cell.value} target="_blank">Receipt</Link>
				{/if}
			{:else if cell.key === 'created_at'}
				{fdate(cell.value)}
			{:else if cell.key === 'due_date'}
				{fdate(cell.value)}
			{:else}
				{cell.value}
			{/if}
		</svelte:fragment>
	</DataTable>
{:else}
	TODO: Empty State
{/if}
