<script lang="ts">
	import { Check, Selector } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import {
		Listbox,
		ListboxOption,
		ListboxButton,
		ListboxOptions,
		ListboxLabel,
	} from '@rgossiaux/svelte-headlessui';

	const people = [
		{ id: 1, name: 'Steve Jobs', unavailable: false },
		{ id: 2, name: 'Bill Gates', unavailable: false },
		{ id: 3, name: 'Mark Zuckerberg', unavailable: false },
		{ id: 4, name: 'Elon Musk', unavailable: true },
		{ id: 5, name: 'Tim Cook', unavailable: false },
		{ id: 6, name: 'Steve Wozniak', unavailable: false },
		{ id: 7, name: 'Larry Page', unavailable: false },
		{ id: 8, name: 'Sergey Brin', unavailable: false },
		{ id: 9, name: 'Larry Ellison', unavailable: false },
		{ id: 10, name: 'Jack Dorsey', unavailable: false },
		{ id: 11, name: 'Jeff Bezos', unavailable: false },
		{ id: 12, name: 'Paul Allen', unavailable: false },
		{ id: 13, name: 'Peter Thiel', unavailable: false },
		{ id: 14, name: 'Michael Bloomberg', unavailable: false },
		{ id: 15, name: 'Jim Walton', unavailable: false },
		{ id: 16, name: 'Jack Ma', unavailable: true },
		{ id: 17, name: 'Jeff Bezo', unavailable: false },
		{ id: 18, name: 'Mark Cuban', unavailable: false },
		{ id: 19, name: 'Jack Dorsey', unavailable: false },
		{ id: 20, name: 'Jeff Bezos', unavailable: false },
		{ id: 21, name: 'Paul Allen', unavailable: false },
		{ id: 22, name: 'Peter Thiel', unavailable: false },
		{ id: 23, name: 'Michael Bloomberg', unavailable: false },
		{ id: 24, name: 'Jim Walton', unavailable: false },
		{ id: 25, name: 'Jack Ma', unavailable: false },
		{ id: 26, name: 'Jeff Bezo', unavailable: false },
		{ id: 27, name: 'Mark Cuban', unavailable: false },
		{ id: 28, name: 'Jack Dorsey', unavailable: false },
		{ id: 29, name: 'Jeff Bezos', unavailable: false },
		{ id: 30, name: 'Paul Allen', unavailable: false },
		{ id: 31, name: 'Peter Thiel', unavailable: false },
		{ id: 32, name: 'Michael Bloomberg', unavailable: false },
		{ id: 33, name: 'Jim Walton', unavailable: false },
		{ id: 34, name: 'Jack Ma', unavailable: false },
		{ id: 35, name: 'Jeff Bezo', unavailable: false },
		{ id: 36, name: 'Mark Cuban', unavailable: false },
		{ id: 37, name: 'Jack Dorsey', unavailable: false },
	];
	export let label = 'Assigned to';
	let selectedPerson = people[2];

	function classNames(...classes: string[]) {
		return classes.filter(Boolean).join(' ');
	}
</script>

<Listbox value={selectedPerson} on:change={(e) => (selectedPerson = e.detail)}>
	<ListboxLabel class="block text-sm font-medium text-gray-700"
		>{label}</ListboxLabel
	>
	<div class="relative mt-1">
		<!-- Select Variant -->
		<!-- <input
			id="combobox"
			type="text"
			role="combobox"
			aria-controls="options"
			aria-expanded="false"
		/> -->
		<ListboxButton
			class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-12 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
		>
			<span class="block truncate">
				{selectedPerson?.name}
			</span>
			<span
				class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
			>
				<Icon
					src={Selector}
					theme="solid"
					class="h-5 w-5 text-gray-400"
					aria-hidden="true"
				/>
			</span>
		</ListboxButton>

		<ListboxOptions
			class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
		>
			{#each people as person (person.id)}
				<ListboxOption
					value={person}
					disabled={person.unavailable}
					let:active
					let:selected
					let:disabled
					class={({ active }) =>
						classNames(
							active ? 'bg-indigo-600 text-white' : 'text-gray-900',
							'relative cursor-default select-none py-2 pl-3 pr-9',
						)}
				>
					<!-- <span class="block truncate" class:font-semibold={selected} -->
					<span
						class={classNames(
							selected ? 'font-semibold' : 'font-normal',
							'block truncate',
						)}>{person.name}</span
					>
					{#if selected}
						<span
							class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600"
							class:text-white={active}
							class:text-indigo-600={!active}
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
