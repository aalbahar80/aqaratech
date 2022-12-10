<script>
	import { fade } from 'svelte/transition';

	import HeroiconsTableCells from '~icons/heroicons/table-cells';
</script>

<div
	class="h-72 w-full overflow-hidden rounded-lg bg-white bg-opacity-50 p-8 shadow"
	in:fade
>
	<div
		class="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-center"
	>
		<HeroiconsTableCells class="mx-auto h-20 w-20  text-gray-300" />
		<span class="block px-8 pt-8 text-xl font-light text-gray-900">
			There are no items to display.
		</span>
	</div>
</div>
