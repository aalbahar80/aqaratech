<script lang="ts">
	import type {
		Option,
		SelectedOption,
	} from '$lib/models/interfaces/option.interface';
	import { classes } from '$lib/utils/classes';
	import {
		Listbox,
		ListboxButton,
		ListboxLabel,
		ListboxOption,
		ListboxOptions,
	} from '@rgossiaux/svelte-headlessui';
	import { Check, Selector } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Fuse from 'fuse.js';

	export let options: Option[];
	export let selection: SelectedOption = undefined;

	let query = 'a';

	const config: ConstructorParameters<typeof Fuse>[1] = {
		includeScore: true,
		keys: ['label'],
	};
	console.log({ options }, 'Combobox.svelte ~ 29');
	$: console.log({ filtered }, 'Combobox.svelte ~ 29');
	$: console.log({ query }, 'Combobox.svelte ~ 30');
	const fuse = new Fuse<Option>(options, config);

	$: filtered = fuse.search(query).map((result) => ({
		value: result.item.value,
		label: result.item.label,
	}));

	// let open = false;
	// let forceOpen = false;
</script>

<!-- let:open -->
<Listbox
	value={selection}
	let:open
	on:change={(e) => {
		selection = e.detail;
		// open = false;
		// isOpen = false;
	}}
>
	<pre>{JSON.stringify(open, null, 2)}</pre>
	<!-- <pre>{JSON.stringify(isOpen, null, 2)}</pre> -->
	<!-- <ListboxLabel class="block text-sm font-medium text-gray-700"
		>Assigned to</ListboxLabel
	> -->
	<div class="relative mt-1">
		<input
			class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
			placeholder="Search..."
			type="text"
			on:input={(event) => {
				query = event.currentTarget?.value;
				open = true;
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

		<!-- {#if open && filtered.length} -->
		<!-- {#if open} -->
		{#if true}
			<ListboxOptions
				class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
				static
			>
				<!-- {#each filtered as item (item.value)} -->
				{#each options as item (item.value)}
					<ListboxOption
						value={item.value}
						class={({ active }) =>
							classes(
								'relative cursor-default select-none py-2 pl-3 pr-9',
								active ? 'bg-indigo-600 text-white' : 'text-gray-900',
							)}
						let:active
						let:selected
					>
						<span
							class={classes('block truncate', selected ? 'font-semibold' : '')}
							>{item.label}</span
						>
						{#if selected}
							<span
								class={classes(
									'absolute inset-y-0 right-0 flex items-center pr-4',
									active ? 'text-white' : 'text-indigo-600',
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
				{/each}
			</ListboxOptions>
		{/if}
	</div>
</Listbox>
