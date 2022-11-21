<script lang="ts">
	import { flexRender, type Table } from '@tanstack/svelte-table';
	import type { Readable } from 'svelte/store';

	export let table: Readable<Table<any>>;

	const sortIcons: Record<string, string> = {
		asc: '↑',
		desc: '↓',
		// asc: ' 🔼',
		// desc: ' 🔽',
	};
</script>

<thead class="bg-gray-50">
	{#each $table.getHeaderGroups() as headerGroup}
		<tr>
			{#each headerGroup.headers as header}
				<th
					colSpan={header.colSpan}
					class="py-2 px-2 text-left text-sm font-semibold text-gray-900"
				>
					{#if !header.isPlaceholder}
						<div
							class:cursor-pointer={header.column.getCanSort()}
							class:select-none={header.column.getCanSort()}
							on:click={header.column.getToggleSortingHandler()}
						>
							<svelte:component
								this={flexRender(
									header.column.columnDef.header,
									header.getContext(),
								)}
							/>
							{#if header.column.getIsSorted()}
								{sortIcons[header.column.getIsSorted().toString()]}
							{/if}
						</div>
					{/if}
				</th>
			{/each}
		</tr>
	{/each}
</thead>
