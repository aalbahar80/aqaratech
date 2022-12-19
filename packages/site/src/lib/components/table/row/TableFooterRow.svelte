<script lang="ts">
	import { flexRender, type HeaderGroup } from '@tanstack/svelte-table';

	type T = $$Generic;

	export let group: HeaderGroup<T>;
</script>

<tr>
	{#each group.headers as header}
		<th
			colSpan={header.colSpan}
			class="py-2 px-2 text-left text-sm font-semibold text-gray-900"
		>
			{#if !header.isPlaceholder}
				<svelte:component
					this={flexRender(header.column.columnDef.footer, header.getContext())}
				/>
			{/if}
		</th>
	{/each}
</tr>

<style lang="postcss">
	th {
		@apply whitespace-nowrap first:pl-4 last:pr-4;
	}
</style>
