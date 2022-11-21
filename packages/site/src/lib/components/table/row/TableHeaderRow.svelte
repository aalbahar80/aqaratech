<script lang="ts">
	import { flexRender, type HeaderGroup } from '@tanstack/svelte-table';

	export let headerGroup: HeaderGroup<any>;

	const sortIcons: Record<string, string> = {
		asc: '↑',
		desc: '↓',
		// asc: ' 🔼',
		// desc: ' 🔽',
	};
</script>

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
