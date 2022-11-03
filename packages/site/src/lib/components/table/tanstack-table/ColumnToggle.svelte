<script lang="ts">
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import type { Table } from '@tanstack/svelte-table';
	import type { Readable } from 'svelte/store';

	export let table: Readable<Table<any>>;

	$: options = $table.getAllLeafColumns().map((c) => ({
		label: c.id,
		value: c.id,
		active: c.getIsVisible(),
		action: c.getToggleVisibilityHandler(),
	}));

	$: toggleAll = {
		label: 'Toggle All',
		value: 'toggle-all',
		active: $table.getIsAllColumnsVisible(),
		action: (e: unknown) => $table.getToggleAllColumnsVisibilityHandler()(e),
	};
</script>

<FilterBar
	responsive={[
		{
			id: 'columns',
			label: 'Columns',
			options: [toggleAll, ...options],
		},
	]}
/>
