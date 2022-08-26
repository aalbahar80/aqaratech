<script lang="ts">
	import Hoverable from '$lib/components/Hoverable.svelte';
	import { classes } from '$lib/utils/classes';
	import { ListboxOption } from '@rgossiaux/svelte-headlessui';
	import { startCase } from 'lodash-es';
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

	const hiddenFields = ['title', 'id', 'organizationId'];

	const highlightedFields = R.pickBy(
		item._formatted,
		(val: string, key) =>
			typeof val === 'string' &&
			val.includes('<mark>') &&
			!hiddenFields.includes(key) &&
			item[key] !== item.title && // hide any field if it matches title
			(key !== 'label' || !item._formatted.title.includes('<mark>')), // hide label if title is already highlighted
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
					class="mr-2 h-6 w-6 flex-none text-gray-400 text-opacity-40"
					aria-hidden="true"
				/>
				<div>
					<p class="pb-2">
						{@html item._formatted.title}
					</p>
					{#each Object.entries(highlightedFields) as [key, val]}
						<p class="text-sm font-light">
							<span class="">
								{startCase(key)}:
							</span>
							{@html val}
						</p>
					{/each}
				</div>
			</div>
		</div>
	</ListboxOption>
</Hoverable>
