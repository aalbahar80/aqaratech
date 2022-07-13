<script lang="ts">
	import Hoverable from '$lib/components/Hoverable.svelte';
	import type {
		Option,
		SelectedOption,
	} from '$lib/models/interfaces/option.interface';
	import { classes } from '$lib/utils/classes';
	import { clickOutside } from '$lib/utils/click-outside';
	import {
		Listbox,
		ListboxButton,
		ListboxOption,
		ListboxOptions,
	} from '@rgossiaux/svelte-headlessui';
	import { Check, Selector } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Fuse from 'fuse.js';
	import { createEventDispatcher } from 'svelte';

	/** Value of the initial option. `options.find()` will be called to find & display the option's label. */
	export let initialValue: SelectedOption = undefined;
	export let options: Option[];

	let selection: SelectedOption = options.find(
		(option) => option.value === initialValue,
	);

	// Complement headlessui's default `open` prop,
	// which is only designed for listboxes not for comboboxes.
	let isOpen = false;

	const dispatch = createEventDispatcher<{
		select: { value: Option['value'] };
	}>();

	// SEARCH
	let query = '';

	const config: ConstructorParameters<typeof Fuse>[1] = {
		includeScore: true,
		keys: ['label', 'value'],
	};
	const fuse = new Fuse<Option>(options, config);

	$: filtered = query
		? fuse.search(query).map((result) => ({
				value: result.item.value,
				label: result.item.label,
		  }))
		: options;
</script>

<Listbox
	value={selection}
	let:open
	on:change={(e) => {
		selection = e.detail;
		dispatch('select', { value: selection?.value });
		isOpen = false;
	}}
>
	<!-- <ListboxLabel class="block text-sm font-medium text-gray-700"
		>Assigned to</ListboxLabel
	> -->
	<div
		class="relative mt-1"
		use:clickOutside
		on:outclick={() => (isOpen = false)}
	>
		<input
			class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
			placeholder="Search..."
			type="text"
			value={selection?.label ?? ''}
			on:input={(event) => {
				query = event.currentTarget?.value;
				isOpen = true;
			}}
		/>
		<ListboxButton
			class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
		>
			<Icon
				src={Selector}
				theme="solid"
				class="h-5 w-5 text-gray-400"
				aria-hidden="true"
			/>
		</ListboxButton>

		{#if (isOpen || open) && filtered.length}
			<ListboxOptions
				class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
				static
			>
				{#each filtered as item (item.value)}
					<Hoverable let:hovering>
						<ListboxOption
							value={item}
							class={classes(
								'relative cursor-default select-none py-2 pl-3 pr-9',
								hovering ? 'bg-indigo-600 text-white' : 'text-gray-900',
							)}
							let:selected
						>
							<span
								class={classes(
									'block truncate',
									selected ? 'font-semibold' : '',
								)}>{item.label}</span
							>
							{#if selected}
								<span
									class={classes(
										'absolute inset-y-0 right-0 flex items-center pr-4',
										hovering ? 'text-white' : 'text-indigo-600',
									)}
								>
									<Icon
										src={Check}
										theme="solid"
										class="h-5 w-5"
										aria-hidden="true"
									/>
								</span>
							{/if}
						</ListboxOption>
					</Hoverable>
				{/each}
			</ListboxOptions>
		{/if}
	</div>
</Listbox>
