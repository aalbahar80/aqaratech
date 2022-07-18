<script lang="ts">
	import type { TableCellLink } from '$lib/models/classes/table.class';

	export let cell: TableCellLink;
</script>

<td
	class="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
>
	<a
		href={cell.href}
		target="_blank"
		sveltekit:prefetch
		class="text-indigo-600 hover:text-indigo-900"
	>
		{cell.label}
	</a>
</td>
