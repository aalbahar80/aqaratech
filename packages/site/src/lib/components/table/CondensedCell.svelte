<script lang="ts">
	import type { TableCellScalar } from '$lib/models/classes/table.class';
	import { classes } from '$lib/utils/classes';

	type Weight = 'bold1' | 'bold2' | 'regular';
	export let weight: Weight = 'regular';
	export let cell: TableCellScalar;
</script>

<td
	class={classes(
		'whitespace-nowrap py-3 px-2 text-sm',
		...(cell.extraStyles || []),
	)}
	class:text-gray-500={weight === 'regular'}
	class:font-medium={weight === 'bold1'}
	class:text-gray-900={weight === 'bold1' || weight === 'bold2'}
>
	{cell.label}
</td>
