<script lang="ts">
	import { Check, Selector } from '@steeze-ui/heroicons';
	import {
		Listbox,
		ListboxButton,
		ListboxLabel,
		ListboxOption,
		ListboxOptions,
	} from '@rgossiaux/svelte-headlessui';
	import { onMount } from 'svelte';
	import { Icon } from '@steeze-ui/svelte-icon';

	type Option = { value: string; label: string };

	// TODO add required asterisk
	export let optionLabel: string;
	export let name: string;
	export let getOptions: (query?: string) => Promise<Option[]>;
	export let value = '';
	export let error: string | void;

	let options: Option[] = [];
	let loading = false;

	const load = async (query = '') => {
		loading = true;
		options = await getOptions(query);
		loading = false;
	};

	onMount(load);
	$: console.log(value, 'value inner select');

	function classes(...classesList: string[]) {
		return classesList.filter(Boolean).join(' ');
	}
</script>

<!-- use bind:value? -->
<!-- <Listbox as="div" {value} onChange={setSelectedPerson}> -->
<Listbox as="div" {value}>
	<ListboxLabel class="block text-sm font-medium text-gray-700"
		>{name}</ListboxLabel
	>
	<div class="relative mt-1">
		<!-- <Listbox.Input
          class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(person) => person.name}
        /> -->
		<input
			class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
			on:input={(e) => load(e.currentTarget.value)}
			value={optionLabel}
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

		<ListboxOptions
			class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
		>
			{#each options as { value, label } (value)}
				<ListboxOption
					{value}
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
						>{label}</span
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
	</div>
</Listbox>
