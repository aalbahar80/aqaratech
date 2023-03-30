<script lang="ts">
	import { flexRender, type HeaderGroup } from '@tanstack/svelte-table';

	import { TABLE_ROW_SPACING } from './spacing';

	type T = $$Generic;

	export let group: HeaderGroup<T>;

	const sortIcons: Record<string, string> = {
		asc: '↑',
		desc: '↓',
		// asc: ' 🔼',
		// desc: ' 🔽',
	};
</script>

<tr>
	{#each group.headers as header}
		<th
			colSpan={header.colSpan}
			class={`px-2 py-2 text-start text-sm font-semibold text-gray-900 ${TABLE_ROW_SPACING}`}
		>
			{#if !header.isPlaceholder}
				<div
					class:cursor-pointer={header.column.getCanSort()}
					class:select-none={header.column.getCanSort()}
					on:click={() => {
						if (!header.column.getCanSort()) {
							return;
						}

						// Sort order: desc -> asc -> none
						const dir = header.column.getIsSorted();
						if (!dir) {
							header.column.toggleSorting(true);
						} else if (dir === 'desc') {
							header.column.toggleSorting(false);
						} else {
							header.column.clearSorting();
						}
					}}
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
