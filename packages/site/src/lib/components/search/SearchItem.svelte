<script lang="ts">
	import Hoverable from '$lib/components/Hoverable.svelte';
	import { classes } from '$lib/utils/classes';
	import { ListboxOption } from '@rgossiaux/svelte-headlessui';

	export let item;
</script>

<Hoverable let:hovering>
	<ListboxOption value={item}>
		<div
			class={classes(
				'cursor-default select-none px-4 py-2 [&_mark]:underline [&_mark]:underline-offset-2',
				hovering
					? 'bg-indigo-600 text-white [&_mark]:text-white [&_mark]:bg-inherit'
					: '[&_mark]:text-indigo-600 [&_mark]:bg-inherit [&_mark]:decoration-indigo-500 [&_mark]:decoration-2',
			)}
		>
			{@html item._formatted.title}
			<!-- example: abc<mark>def</mark>hij <mark>ح</mark>افظ المحجوب -->
		</div>
	</ListboxOption>
</Hoverable>
