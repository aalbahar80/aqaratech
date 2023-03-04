<script lang="ts">
	import { flexRender, type Row } from '@tanstack/svelte-table';
	import clsx from 'clsx';

	import { TABLE_ROW_SPACING } from './spacing';

	export let row: Row<{ id: string }>;
</script>

{#each row.getVisibleCells() as cell}
	{@const cellValueType = typeof cell.getValue()}
	<td
		class={clsx(
			'py-2 px-2 text-base text-gray-600',
			{ 'slashed-zero tabular-nums': cellValueType === 'number' },
			TABLE_ROW_SPACING,
		)}
	>
		<!-- Rendering null cells throws. This might only be an issue
									when the entire column is null on a given page. -->
		{#if cell.getValue() !== null}
			<svelte:component
				this={flexRender(cell.column.columnDef.cell, cell.getContext())}
			/>
		{/if}
	</td>
{/each}
