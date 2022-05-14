<script lang="ts">
	import type { InferQueryOutput } from '$lib/client/trpc';
	import CondensedTable from '$lib/components/table/CondensedTable.svelte';
	import { Property } from '$lib/models/classes';
	import { dateFormat, kwdFormat } from '$lib/utils/common';

	type Data = InferQueryOutput<'owner:charts:expenses'>;
	type Entry = Data[number];
	interface RowHeader<T extends keyof Entry> {
		key: T;
		label: string;
		style?: 'regular' | 'bold1' | 'bold2';
		format?: (value: any) => string;
	}

	export let data: Data;
	const headers: RowHeader<keyof Entry>[] = [
		{
			key: 'postAt',
			label: 'Date',
			format: (value: Date) => dateFormat(value),
		},
		{
			key: 'category',
			label: 'Category',
			style: 'bold1',
		},
		{
			key: 'amount',
			label: 'Amount',
			format: (value: number) => kwdFormat(value),
		},
		{
			key: 'relatedProperty',
			label: 'Location',
			format: (value) => (value ? Property.getLabel(value) : '-'),
		},
	];
</script>

<div class="px-4 sm:px-6 lg:px-8">
	<div class="mt-8 flex flex-col">
		<div
			class="-my-2 -mx-4 overflow-auto sm:-mx-6 lg:-mx-8"
			style="height: 600px;"
		>
			<CondensedTable {headers} trxs={data.slice(0, 100)} />
		</div>
	</div>
</div>
