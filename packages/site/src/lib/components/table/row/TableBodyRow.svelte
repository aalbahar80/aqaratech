<script lang="ts">
	import clsx from 'clsx';

	import type { Row } from '@tanstack/svelte-table';

	import { flexRender } from '$lib/components/table/flex-render';
	import { TABLE_ROW_SPACING } from '$lib/components/table/row/spacing';

	export let row: Row<{ id: string }>;
</script>

{#each row.getVisibleCells() as cell}
	{@const cellValueType = typeof cell.getValue()}
	<td
		class={clsx(
			'px-2 py-2 text-center text-base text-gray-600',
			cellValueType === 'number' &&
				'slashed-zero tabular-nums ltr:text-end rtl:text-start',
			TABLE_ROW_SPACING,
			cell.column.columnDef.meta?.cls,
		)}
	>
		<svelte:component
			this={flexRender(cell.column.columnDef.cell, cell.getContext())}
		/>
	</td>
{/each}
