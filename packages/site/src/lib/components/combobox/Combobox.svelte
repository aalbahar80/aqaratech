<script lang="ts">
	import {
		Combobox,
		ComboboxButton,
		ComboboxInput,
		ComboboxOptions,
		ComboboxOption,
	} from '@rgossiaux/svelte-headlessui';
	import clsx from 'clsx';

	import { createEventDispatcher } from 'svelte';

	import HeroiconsCheck from '~icons/heroicons/check';
	import HeroiconsOutlineSelector from '~icons/heroicons-outline/selector';

	type TOption = $$Generic<object>;

	export let options: TOption[];

	/** Label to display for each option */
	export let getLabel: (option: TOption | undefined) => string;

	/** Key to use for each block */
	export let getKey: (option: TOption) => unknown;

	/** Search query. May be bound to to filter/refresh options.
	 * Alternatively, you may listen to the `filter` event. */
	export let q = '';

	/** Extra classes to apply to the input */
	export let comboboxInputClass: string | undefined;

	let selectedOption: TOption | undefined = undefined;

	const dispatch = createEventDispatcher<{
		filter: string;
		select: TOption;
	}>();

	/** Fired whenever search query changes. May be used to react to changes.
	 * Alternatively, you may bind to the input value `bind:q` */
	$: dispatch('filter', q);
	$: dispatch('select', selectedOption);
</script>

<Combobox
	as="div"
	value={selectedOption}
	on:change={(e) => (selectedOption = e.detail)}
>
	<!-- <ComboboxLabel class="block text-sm font-medium leading-6 text-gray-900"> -->
	<!-- 	Label -->
	<!-- </ComboboxLabel> -->
	<slot name="label" />

	<div class="relative mt-2">
		<ComboboxInput
			autocomplete="off"
			class={clsx(
				'w-full rounded-md border-0 bg-white py-1.5 pe-10 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6',
				comboboxInputClass,
			)}
			on:change={(e) => (q = e.detail)}
			displayValue={getLabel}
		/>

		<ComboboxButton
			class="absolute inset-y-0 end-0 flex items-center px-2 focus:outline-none ltr:rounded-r-md rtl:rounded-l-md"
		>
			<HeroiconsOutlineSelector
				class="h-5 w-5 text-gray-400"
				aria-hidden="true"
			/>
		</ComboboxButton>

		{#if options.length > 0}
			<ComboboxOptions
				class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
			>
				{#each options as option (getKey(option))}
					<ComboboxOption
						let:active
						let:selected
						value={option}
					>
						<div
							class={clsx(
								'relative cursor-default select-none py-2 pe-9 ps-3',
								active ? 'bg-indigo-600 text-white' : 'text-gray-900',
							)}
						>
							<span class={clsx('block truncate', selected && 'font-semibold')}>
								{getLabel(option)}
							</span>

							{#if selected}
								<span
									class={clsx(
										'absolute inset-y-0 end-0 flex items-center pe-4',
										active ? 'text-white' : 'text-indigo-600',
									)}
								>
									<HeroiconsCheck
										class="h-5 w-5"
										aria-hidden="true"
									/>
								</span>
							{/if}
						</div>
					</ComboboxOption>
				{/each}
			</ComboboxOptions>
		{/if}
	</div>
</Combobox>
