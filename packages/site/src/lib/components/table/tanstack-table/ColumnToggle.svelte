<script lang="ts">
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import type { Table } from '@tanstack/svelte-table';
	import type { Readable } from 'svelte/store';

	export let table: Readable<Table<any>>;
</script>

<div class="inline-block rounded border border-black shadow">
	<!-- <div class="border-b border-black px-1">
		<label>
			<input
				checked={$table.getIsAllColumnsVisible()}
				on:change={(e) => {
					console.info($table.getToggleAllColumnsVisibilityHandler()(e));
				}}
				type="checkbox"
			/>{' '}
			Toggle All
		</label>
	</div> -->
	{#each $table.getAllLeafColumns() as column}
		<div class="px-1">
			<label>
				<input
					checked={column.getIsVisible()}
					on:change={column.getToggleVisibilityHandler()}
					type="checkbox"
				/>{' '}
				{column.id}
			</label>
		</div>
	{/each}
</div>

<FilterBar
	responsive={[
		{
			id: 'columns',
			label: 'Columns',
			options: $table.getAllLeafColumns().map((c) => ({
				label: c.id,
				value: c.id,
				active: c.getIsVisible(),
				action: c.getToggleVisibilityHandler(),
			})),
		},
	]}
/>
