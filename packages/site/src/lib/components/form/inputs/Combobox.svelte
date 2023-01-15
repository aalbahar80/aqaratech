<script lang="ts">
	import debounce from 'debounce';
	import Fuse from 'fuse.js';

	import { createEventDispatcher, tick } from 'svelte';

	import L from '$i18n/i18n-svelte';
	import { clickOutside } from '$lib/actions/click-outside';
	import Hoverable from '$lib/components/Hoverable.svelte';
	import { classes } from '$lib/utils/classes';

	import type {
		Option,
		SelectedOption,
	} from '$lib/models/interfaces/option.interface';

	import HeroiconsOutlineSelector from '~icons/heroicons-outline/selector';
	import HeroiconsOutlineXCircle from '~icons/heroicons-outline/x-circle';
	import HeroiconsCheck from '~icons/heroicons/check';
	// TODO optimize use lodash debounce?

	// P.S. At time of writing, headlessui does not have a native combobox.

	/** Value of the initial option. `options.find()` will be called to find & display the option's label. */
	export let initialValue: unknown = undefined;
	export let options: Option[];
	/**
	 * Whether the entire combobox is disabled.
	 * Do not confuse with option.disabled or item.disabled.
	 */
	export let disabled = false;
	export let invalid = false;
	export let inputId: string;

	let selection: SelectedOption = options.find(
		(option) => option.value === initialValue,
	);

	/**
	 * Helper to manually force the combobox to open.
	 */
	let forceOpen = false;

	/**
	 * Bound to the text input's value to communicate to the user what has been selected.
	 */
	let inputValue = selection?.label.trim() ?? '';

	// SEARCH
	let query = '';

	const config: ConstructorParameters<typeof Fuse>[1] = {
		includeScore: true,
		keys: ['label', 'value'],
	};

	// Because `handleFilter()` doesn't pick up `options` change by a parent component,
	// we make `filtered` reactive here.
	$: filtered = options;

	const handleFilter = debounce((q: string) => {
		dispatch('filter', q);

		// fuse instance needs to be recreated in case `options` array is changed by a parent component.
		// if this is problematic, we can explore using `fuse.setCollection()` instead.
		const fuse = new Fuse<Option>(options, config);
		filtered = q
			? fuse.search(q).map((result) => ({
					value: result.item.value,
					label: result.item.label,
					disabled: result.item.disabled ?? false,
			  }))
			: options;
	}, 100);
	$: handleFilter(query);

	// EVENTS
	const dispatch = createEventDispatcher<{
		select: { value: Option['value'] };
		filter: string;
	}>();

	/** Clear input/selection then dispatch `select` event. */
	export const clear = async () => {
		await tick();
		dispatch('select', { value: null }); // has to be first
		query = '';
		inputValue = '';
		selection = undefined;
	};

	export const select = async (option: Option) => {
		if (option.disabled) return;
		await tick();
		dispatch('select', { value: option.value });
		selection = option;
		query = '';
		inputValue = selection?.label.trim() || '';
		forceOpen = false;
		setActiveOption(undefined);
	};

	export const setActiveOption = (option: Option | undefined) => {
		// await tick();
		activeOption = option;
	};

	// ACCESSIBILITY
	/**
	 * Helper to make combobox accessible.
	 */
	let activeOption: Option | undefined;
	const autoScroll = true;

	$: if (!forceOpen) {
		// activeOption should be cleared when the combobox is closed.
		// NOTE this case only handles `forceOpen`. There is a similar prop exposed by headlessui's `Listbox` called `open`.
		setActiveOption(undefined);
	} else if (query) {
		setActiveOption(filtered[0]);
	}

	async function handleKeydown(event: KeyboardEvent) {
		// https://github.com/janosh/svelte-multiselect/blob/main/src/lib/MultiSelect.svelte#L192
		// on escape or tab out of input: dismiss options dropdown and reset search text
		if (event.key === `Escape`) {
			forceOpen = false;
			query = '';
		} else if (event.key === `Tab`) {
			// TODO can be deduped with 'enter' key logic
			if (activeOption) {
				await select(activeOption);
			} else {
				forceOpen = false;
			}
		} else if (event.key === `Enter`) {
			// on enter key: toggle active option and reset search text
			event.preventDefault(); // prevent enter key from triggering form submission

			if (activeOption && forceOpen) {
				await select(activeOption);
			} else if (forceOpen) {
				forceOpen = false;
			} else {
				// no active option means the options dropdown is closed
				// in which case enter means open it
				forceOpen = true;
			}
		}
		// on up/down arrow keys: update active option
		else if ([`ArrowDown`, `ArrowUp`].includes(event.key)) {
			// by default arrow up/down will go to beginning/end of text input
			event.preventDefault();
			// if no option is active yet, but there are matching options, make first one active
			if (!activeOption && filtered.length > 0) {
				forceOpen = true;
				setActiveOption(filtered[0]);
				return;
			} else if (!activeOption) {
				// if no option is active and no options are matching, do nothing
				return;
			}

			const increment = event.key === `ArrowUp` ? -1 : 1;
			const newActiveIdx = filtered.indexOf(activeOption) + increment;

			if (newActiveIdx < 0) {
				// wrap around top
				setActiveOption(filtered[filtered.length - 1]);
			} else if (newActiveIdx === filtered.length) {
				// wrap around bottom
				setActiveOption(filtered[0]);
			} else {
				// default case: select next/previous in item list
				setActiveOption(filtered[newActiveIdx]);
			}

			if (autoScroll) {
				// `await tick` is needed to properly scroll element into view
				// when wrapping around start/end of option list.
				await tick();
				const li = document.querySelector<HTMLLIElement>(`li.isActive`);
				li?.scrollIntoView({
					block: `nearest`, // only scroll the listbox & only when it's not visible
				});
			}
		}
	}
</script>

<div
	class="relative mt-1"
	use:clickOutside
	on:outclick={() => (forceOpen = false)}
>
	<input
		id={inputId}
		data-value={selection?.value}
		{disabled}
		class="w-full rounded-md border border-gray-300 bg-white py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none ltr:pr-10 ltr:pl-3 rtl:pl-10 rtl:pr-3 sm:text-sm"
		class:form-invalid={invalid}
		placeholder={`${$L.buttons.search()}...`}
		autocomplete="off"
		type="text"
		bind:value={inputValue}
		on:keydown={handleKeydown}
		on:click={() => {
			forceOpen = true;
		}}
		on:input={async (event) => {
			// expense categories use leading spaces to indicate hierarchy
			query = event.currentTarget?.value.trim();
			if (!query) {
				await clear();
			}
			forceOpen = true;
		}}
	/>
	<div
		class="absolute inset-y-0 flex items-center rounded-r-md px-2 focus:outline-none ltr:right-0 rtl:left-0"
	>
		<button
			class="mr-4"
			hidden={!selection}
			tabindex="-1"
			on:mousedown={() => {
				void clear();
			}}
		>
			<HeroiconsOutlineXCircle
				class="h-5 w-5 text-gray-400"
				aria-hidden="true"
			/>
		</button>
		<button
			tabindex="-1"
			on:click|preventDefault={() => {
				forceOpen = !forceOpen;
			}}
		>
			<HeroiconsOutlineSelector
				class="h-5 w-5 text-gray-400"
				aria-hidden="true"
			/>
		</button>
	</div>

	{#if forceOpen && filtered.length}
		<ul
			class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
		>
			<!-- If further optimization is needed: https://tanstack.com/virtual/v3 -->
			{#each filtered as item (item.value)}
				{@const selected = selection?.value === item.value}
				<Hoverable let:hovering>
					<!-- TODO classes can be simplified. It'd be preferrable to not use BOTH `classes()` utility AND `style` tag -->
					<!-- Don't confuse `disabled` (entire component) with `item.disabled` (single option) -->
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<li
						value={item}
						class={classes(
							'relative cursor-default select-none py-2 ltr:pl-3 ltr:pr-9 rtl:pr-3 rtl:pl-9',
							hovering || activeOption === item ? 'isActive' : '',
							(hovering || activeOption === item) && !item.disabled
								? 'bg-indigo-600 text-white'
								: '',
							(hovering || activeOption === item) && item.disabled
								? 'bg-zinc-200'
								: '',
							!hovering && !activeOption ? 'text-gray-900' : '',
						)}
						class:disabled={item.disabled}
						aria-selected={selected}
						aria-disabled={item.disabled}
						on:click={() => {
							void select(item);
						}}
					>
						<span
							data-testid={item.value}
							class={classes('block truncate', selected ? 'font-semibold' : '')}
							>{item.label}</span
						>
						{#if selected}
							<span
								class={classes(
									'absolute inset-y-0 flex items-center ltr:right-0 ltr:pr-4 rtl:left-0 rtl:pl-4',
									hovering ? 'text-white' : 'text-indigo-600',
								)}
							>
								<HeroiconsCheck class="h-5 w-5" aria-hidden="true" />
							</span>
						{/if}
					</li>
				</Hoverable>
			{/each}
		</ul>
	{/if}
</div>

<style lang="postcss">
	.form-invalid {
		@apply border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500;
	}
	.disabled {
		@apply cursor-not-allowed border-slate-200 text-slate-500 shadow-none;
	}
</style>
