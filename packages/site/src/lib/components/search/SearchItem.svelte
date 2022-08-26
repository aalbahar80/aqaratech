<script lang="ts">
	import Hoverable from '$lib/components/Hoverable.svelte';
	import { classes } from '$lib/utils/classes';
	import { ListboxOption } from '@rgossiaux/svelte-headlessui';
	import * as R from 'remeda';
	import HeroiconsOutlineFolder from '~icons/heroicons-outline/folder';

	type Obj = {
		id: string;
		title: string;
	} & Record<string, any>;

	type Item = {
		_formatted: Obj;
	} & Obj;

	export let item: Item;

	const highlightedFields = R.pickBy(
		item._formatted,
		(val: string, key) =>
			typeof val === 'string' &&
			val.includes('<mark>') &&
			key !== 'title' &&
			key !== 'organizationId' &&
			key !== 'id' &&
			item[key] !== item.title,
	);
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
			<div class="flex">
				<HeroiconsOutlineFolder
					class="mr-2 h-6 w-6 flex-none self-center align-middle text-gray-400 text-opacity-40"
					aria-hidden="true"
				/>
				<div class="">
					{@html item._formatted.title}
					{#each Object.entries(highlightedFields) as [key, val]}
						<p>
							{key}:
							{@html val}
						</p>
					{/each}
				</div>
			</div>
		</div>
	</ListboxOption>
</Hoverable>
