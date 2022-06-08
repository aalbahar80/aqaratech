<script lang="ts">
	import CondensedActionCell from '$lib/components/table/CondensedActionCell.svelte';
	import CondensedCell from '$lib/components/table/CondensedCell.svelte';
	import CondensedPagination from '$lib/components/table/CondensedPagination.svelte';
	import { createPagination } from '$lib/components/table/pagination';
	import type { CTable } from '$lib/models/classes/table.class';
	import { classes } from '$lib/utils';

	type T = $$Generic<string>;
	export let table: CTable<T>;
	$: pgn = createPagination(table.getPagination(25));
</script>

<div class="inline-block min-w-full py-6 align-middle md:px-6 lg:px-8">
	<div
		class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
	>
		<table class="min-w-full divide-y divide-gray-300">
			<thead class="bg-gray-50">
				<tr>
					{#each table.headers as header, idx (header.key)}
						{#if header.key === 'view'}
							<th
								scope="col"
								class="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6"
							>
								<span class="sr-only">View</span>
							</th>
						{:else}
							<th
								scope="col"
								class={classes(
									idx === 0 ? 'sm:pl-6 pl-4 pr-3' : 'px-2',
									'whitespace-nowrap py-3.5 text-left text-sm font-semibold text-gray-900',
								)}
							>
								{header.key}
							</th>
						{/if}
					{/each}
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200 bg-white">
				{#each table.getPage($pgn.pageIdx, $pgn.pageSize) as row (row.id)}
					<tr>
						{#each table.headers as header, idx (header.key)}
							{#if header.key === 'view'}
								<CondensedActionCell href={row[header.key]} label="View" />
							{:else}
								<CondensedCell
									{idx}
									value={row[header.key] ?? ''}
									weight={header.style}
								/>
							{/if}
						{/each}
					</tr>
				{/each}
			</tbody>
			{#if table.footer}
				<tfoot class="bg-gray-50">
					{#each table.headers as header, idx (header.key)}
						{@const value = table.footer[header.key]}
						<th
							scope="col"
							class={classes(
								idx === 0 ? 'sm:pl-6 pl-4 pr-3' : 'px-2',
								'whitespace-nowrap py-3.5 text-left text-sm font-semibold text-gray-900',
							)}
						>
							{#if value}
								{value}
							{/if}
						</th>
					{/each}
				</tfoot>
			{/if}
		</table>
		{#if $pgn.pageCount > 1}
			<CondensedPagination {pgn} />
		{/if}
	</div>
</div>
