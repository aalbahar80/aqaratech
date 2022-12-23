<script lang="ts">
	import { ListboxOption } from '@rgossiaux/svelte-headlessui';
	import clsx from 'clsx';
	import * as R from 'remeda';

	import { startCase } from '@self/utils';

	import Hoverable from '$lib/components/Hoverable.svelte';
	import type { Icon } from '$lib/models/types/icon.type';
	import { classes } from '$lib/utils/classes';

	import type { HitDto } from '$api/openapi';

	export let item: HitDto;
	export let icon: Icon;

	const hiddenFields = ['title', 'id', 'organizationId'];

	$: highlightedFields =
		R.pickBy(
			item.formatted,
			(val, key: string) =>
				typeof val === 'string' &&
				val.includes('<mark>') &&
				!hiddenFields.includes(key) &&
				key in item &&
				// @ts-expect-error overcome strict interface index signature
				item[key] !== item.title && // hide any field if it matches title
				(key !== 'label' || !item.formatted?.title?.includes('<mark>')), // hide label if title is already highlighted
		) ?? {};
</script>

<Hoverable let:hovering>
	<ListboxOption value={item}>
		<div
			class={clsx(
				// split to avoid prettier conflict with vscode
				'm-2 cursor-default select-none px-4 py-2',
				'[&_mark]:underline [&_mark]:underline-offset-2',
				hovering
					? [
							'bg-indigo-600 text-white',
							'[&_mark]:bg-inherit [&_mark]:text-white',
					  ]
					: '[&_mark]:bg-inherit [&_mark]:text-indigo-600 [&_mark]:decoration-indigo-500 [&_mark]:decoration-2',
			)}
		>
			<div class="flex">
				<svelte:component
					this={icon}
					class={classes(
						'mr-2 h-6 w-6 flex-none text-opacity-40',
						hovering ? 'text-white text-opacity-70' : 'text-gray-400',
					)}
					aria-hidden="true"
				/>
				<div class="flex flex-col gap-y-1">
					<p>
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						{@html item.formatted?.title}
					</p>
					<div class="flex flex-col gap-y-1 text-xs font-light">
						{#each Object.entries(highlightedFields) as [key, val]}
							<p>
								<span class="font-extralight">
									{startCase(key)}:
								</span>
								<!-- eslint-disable-next-line svelte/no-at-html-tags -->
								{@html val}
							</p>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</ListboxOption>
</Hoverable>
