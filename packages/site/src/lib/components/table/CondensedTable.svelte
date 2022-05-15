<script lang="ts">
	import CondensedActionCell from '$lib/components/table/CondensedActionCell.svelte';
	import CondensedCell from '$lib/components/table/CondensedCell.svelte';
	import type { CTable } from '$lib/models/classes/table.class';
	import { classes } from '$lib/utils';

	type T = $$Generic<string>;
	export let table: CTable<T>;

	let pageIdx = 1;
</script>

<div class="inline-block min-w-full py-6 align-middle md:px-6 lg:px-8">
	<div class="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
		<table class="min-w-full divide-y divide-gray-300">
			<thead class="sticky bg-gray-50" style="inset-block-start: 0;">
				<tr>
					{#each table.headers as header, idx (header.key)}
						{#if header.key === 'edit'}
							<th
								scope="col"
								class="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6"
							>
								<span class="sr-only">Edit</span>
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
				{#each table.getPage(pageIdx, 30) as row (row.id)}
					<tr>
						{#each table.headers as header, idx (header.key)}
							{#if header.key === 'edit'}
								<CondensedActionCell href="#" label="Edit" />
							{:else}
								<CondensedCell
									{idx}
									value={row[header.key]}
									weight={header.style}
								/>
							{/if}
						{/each}
					</tr>
				{/each}
			</tbody>
			{#if table.footer}
				<tfoot class="sticky bg-gray-50" style="inset-block-end: 0;">
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
	</div>
</div>
