<script lang="ts">
	import { flexRender, type Row } from '@tanstack/svelte-table';
	import clsx from 'clsx';
	import { fade } from 'svelte/transition';

	export let row: Row<any>;
</script>

<tr class="odd:bg-white even:bg-gray-50" data-testid={row.original.id}>
	{#each row.getVisibleCells() as cell}
		{@const cellValueType = typeof cell.getValue()}
		<td
			in:fade={{ duration: 200 }}
			class={clsx('py-4 px-2 text-lg text-gray-600', {
				'slashed-zero tabular-nums': cellValueType === 'number',
			})}
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
</tr>

<style lang="postcss">
	td {
		@apply whitespace-nowrap first:pl-4 last:pr-4;
	}
</style>
