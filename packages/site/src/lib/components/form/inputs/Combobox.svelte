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
	import { Check, Selector, XCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Fuse from 'fuse.js';
	import { createEventDispatcher, tick } from 'svelte';

	/** Value of the initial option. `options.find()` will be called to find & display the option's label. */
	export let initialValue: Option['value'] = undefined;
	export let options: Option[];
	export let disabled = false;
	export let invalid = false;

	let activeOption: Option | undefined;
	$: console.log('activeOption: ', activeOption);
	$: {
		if (query) {
			activeOption = filtered[0];
		}
	}

	let selection: SelectedOption = options.find(
		(option) => option.value === initialValue,
	);

	/**
	 * Helper to manually force the combobox to open.
	 * Complement's headlessui's default `open` prop,
	 * which is only designed for listboxes not for comboboxes.
	 */
	let forceOpen = false;

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

	// EVENTS
	const dispatch = createEventDispatcher<{
		select: { value: Option['value'] };
	}>();

	/** Clear input/selection then dispatch `select` event. */
	export const clear = async () => {
		await tick();
		dispatch('select', { value: null }); // has to be first
		query = '';
		selection = undefined;
	};

	export const select = async (option: Option) => {
		// await tick();
		dispatch('select', { value: option.value });
		selection = option;
		query = '';
	};

	async function handleKeydown(event: KeyboardEvent) {
		// https://github.com/janosh/svelte-multiselect/blob/main/src/lib/MultiSelect.svelte#L192
		// on escape or tab out of input: dismiss options dropdown and reset search text
		https: console.log(event.key);
		if (event.key === `Escape` || event.key === `Tab`) {
			forceOpen = false;
			query = '';
		}
		// on enter key: toggle active option and reset search text
		else if (event.key === `Enter`) {
			event.preventDefault(); // prevent enter key from triggering form submission

			if (activeOption) {
				select(activeOption);
				forceOpen = false;
				activeOption = undefined;
				// query = '';
			}
			// else if (allowUserOptions && searchText.length > 0) {
			// 	// user entered text but no options match, so if allowUserOptions is truthy, we create new option
			// 	add(searchText);
			// }
			// no active option and no search text means the options dropdown is closed
			// in which case enter means open it
			else {
				forceOpen = true;
			}
		}
		// on up/down arrow keys: update active option
		// else if ([`ArrowDown`, `ArrowUp`].includes(event.key)) {
		// 	// if no option is active yet, but there are matching options, make first one active
		// 	if (activeOption === null && matchingOptions.length > 0) {
		// 		activeOption = matchingOptions[0];
		// 		return;
		// 	} else if (allowUserOptions && searchText.length > 0) {
		// 		// if allowUserOptions is truthy and user entered text but no options match, we make
		// 		// <li>{addUserMsg}</li> active on keydown (or toggle it if already active)
		// 		activeMsg = !activeMsg;
		// 		return;
		// 	} else if (activeOption === null) {
		// 		// if no option is active and no options are matching, do nothing
		// 		return;
		// 	}
		// 	const increment = event.key === `ArrowUp` ? -1 : 1;
		// 	const newActiveIdx = matchingOptions.indexOf(activeOption) + increment;

		// 	if (newActiveIdx < 0) {
		// 		// wrap around top
		// 		activeOption = matchingOptions[matchingOptions.length - 1];
		// 	} else if (newActiveIdx === matchingOptions.length) {
		// 		// wrap around bottom
		// 		activeOption = matchingOptions[0];
		// 	} else {
		// 		// default case: select next/previous in item list
		// 		activeOption = matchingOptions[newActiveIdx];
		// 	}
		// 	if (autoScroll) {
		// 		// TODO This ugly timeout hack is needed to properly scroll element into view when wrapping
		// 		// around start/end of option list. Find a better solution than waiting 10 ms to.
		// 		setTimeout(() => {
		// 			const li = document.querySelector(`ul.options > li.active`);
		// 			li?.scrollIntoView();
		// 		}, 10);
		// 	}
		// }
		// // on backspace key: remove last selected option
		// else if (
		// 	event.key === `Backspace` &&
		// 	selectedLabels.length > 0 &&
		// 	!searchText
		// ) {
		// 	remove(selectedLabels.at(-1) as string | number);
		// }
	}
</script>

<Listbox
	value={selection}
	let:open
	on:change={(e) => {
		selection = e.detail;
		dispatch('select', { value: selection?.value });
		forceOpen = false;
	}}
	{disabled}
>
	<!-- <ListboxLabel class="block text-sm font-medium text-gray-700"
		>Assigned to</ListboxLabel
	> -->
	<div
		class="relative mt-1"
		use:clickOutside
		on:outclick={() => (forceOpen = false)}
	>
		<input
			{disabled}
			class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none sm:text-sm"
			class:form-invalid={invalid}
			placeholder="Search..."
			type="text"
			value={selection?.label?.trim() ?? ''}
			on:keydown={handleKeydown}
			on:click={() => {
				forceOpen = true;
			}}
			on:input={(event) => {
				// expense categories use leading spaces to indicate hierarchy
				query = event.currentTarget?.value.trim();
				if (!query) {
					dispatch('select', { value: null });
				}
				forceOpen = true;
			}}
		/>
		<div
			class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
		>
			<button
				class="mr-4"
				hidden={!selection}
				on:click|preventDefault={() => {
					clear();
				}}
			>
				<Icon
					src={XCircle}
					theme="solid"
					class="h-5 w-5 text-gray-400"
					aria-hidden="true"
				/>
			</button>
			<ListboxButton>
				<Icon
					src={Selector}
					theme="solid"
					class="h-5 w-5 text-gray-400"
					aria-hidden="true"
				/>
			</ListboxButton>
		</div>

		{#if (forceOpen || open) && filtered.length}
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
								hovering || activeOption === item
									? 'bg-indigo-600 text-white'
									: 'text-gray-900',
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

<style lang="postcss">
	.form-invalid {
		@apply border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500;
	}
</style>
