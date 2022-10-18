<script lang="ts">
	import type { TableCellLink } from '$lib/models/classes/table.class';
	import { classes } from '$lib/utils/classes';

	type Weight = 'bold1' | 'bold2' | 'regular';
	export let cell: TableCellLink;
	export let weight: Weight | undefined = undefined;
</script>

<td
	class="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
>
	<a
		href={cell.href}
		target="_blank"
		rel="noreferrer"
		class={classes(
			'text-indigo-600 hover:text-indigo-900',
			...(cell.extraStyles || []),
		)}
		class:text-gray-500={weight === 'regular'}
		class:font-medium={weight === 'bold1'}
		class:text-gray-900={weight === 'bold1' || weight === 'bold2'}
	>
		{cell.label}
	</a>
</td>
