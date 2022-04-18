<!-- <script lang="ts">
	import { Check, Selector } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import {
		Listbox,
		ListboxOption,
		ListboxButton,
		ListboxOptions,
		ListboxLabel,
	} from '@rgossiaux/svelte-headlessui';
	import { clickOutside } from '$lib/utils/actions';
	import { onMount, tick } from 'svelte';

	export let label = 'Assigned to';

	const people = [
		{ id: 1, name: 'Steve Jobs', unavailable: false },
		{ id: 2, name: 'Bill Gates', unavailable: false },
		{ id: 3, name: 'Mark Zuckerberg', unavailable: false },
		{ id: 4, name: 'Elon Musk', unavailable: false },
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
		{ id: 16, name: 'Jack Ma', unavailable: false },
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
		{ id: 28, name: 'Jack Dorsey', unavailable: false },
		{ id: 29, name: 'Jeff Bezos', unavailable: false },
		{ id: 30, name: 'Paul Allen', unavailable: false },
		{ id: 31, name: 'Peter Thiel', unavailable: false },
		{ id: 32, name: 'Michael Bloomberg', unavailable: false },
		{ id: 33, name: 'Jim Walton', unavailable: false },
		{ id: 34, name: 'Jack Ma', unavailable: false },
		{ id: 35, name: 'Jeff Bezo', unavailable: false },
		{ id: 37, name: 'Jack Dorsey', unavailable: false },
	];

	let selectedPerson = people[2];
	let query = '';
	$: filteredPeople =
		query === ''
			? people
			: people.filter((person) => {
					return person.name.toLowerCase().includes(query.toLowerCase());
			  });

	let open = false;
	$: console.log({ selectedPerson }, 'Combobox.svelte ~ 53');
	// $: console.log(open);
	let inputRef: HTMLElement | undefined;

	let isActive = false;
	let doc;
	onMount(() => {
		doc = document;
		if (doc) console.log(doc?.activeElement);
	});
	$: {
		if (doc) console.log(doc?.activeElement);
	}
</script> -->

<!-- <Listbox
	value={selectedPerson}
	on:change={(e) => {
		open = false;
		selectedPerson = e.detail;
	}}
	use={[clickOutside]}
	on:outclick={() => {
		open = false;
	}}
>
	{open}
	<ListboxLabel class="block text-sm font-medium text-gray-700"
		>{label}</ListboxLabel
	>
	<div class="relative mt-1">
		<input
			id="combobox"
			type="text"
			role="combobox"
			class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
			value={selectedPerson?.name}
			on:keydown={async (e) => {
				if (e.key === 'ArrowDown') {
					e.preventDefault();
					e.stopPropagation();
					// await tick();
					console.log(inputRef?.classList?.value);
					// inputRef?.focus();
					const el = document.getElementsByClassName('myc');
					console.log(el);
					console.log(el[0]);
					el[0]?.focus();
					// open = false;
				}
			}}
			on:input={(e) => {
				open = true;
				query = e.target.value;
				// console.log(e.target.value);
			}}
		/>
		<ListboxButton
			class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
		>
			<span
				class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
				on:click={() => {
					open = !open;
				}}
			>
				<Icon
					src={Selector}
					theme="solid"
					class="h-5 w-5 text-gray-400"
					aria-hidden="true"
				/>
			</span>
		</ListboxButton>

		{#if open && filteredPeople.length > 0}
			<ListboxOptions
				class="myc absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
				static
			>
				unmount
				{#each filteredPeople as person (person.id)}
					{@const selected = person.id === selectedPerson?.id}
					<ListboxOption
						value={person}
						disabled={person.unavailable}
						class={classNames(
							person.unavailable ? 'bg-indigo-600 text-white' : 'text-gray-900',
							'relative cursor-default select-none py-2 pl-3 pr-9',
						)}
					>
						<span
							on:mouseenter={() => {
								person.unavailable = true;
							}}
							on:mouseleave={() => {
								person.unavailable = false;
							}}
							class={classNames(
								selected ? 'font-semibold' : 'font-normal',
								'block truncate',
							)}
							>{person.name}
						</span>
						{#if selected}
							<span
								class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600"
								class:text-white={person.unavailable}
								class:text-indigo-600={!person.unavailable}
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
</Listbox> -->
<!-- <pre class="-ml-60">{JSON.stringify(selectedPerson, null, 2)}</pre> -->
<!-- <pre class="-ml-60">{JSON.stringify(open, null, 2)}</pre> -->
<!-- <pre class="-ml-60">{JSON.stringify(filteredPeople, null, 2)}</pre> -->
<!-- <label for="myBrowser">Choose a browser from this list:</label>
<input list="browsers" id="myBrowser" name="myBrowser" />
<datalist id="browsers">
	<option value="Chrome" /><option value="Firefox" /><option
		value="Internet Explorer"
	/><option value="Opera" /><option value="Safari" /><option
		value="Microsoft Edge"
	/></datalist
> -->
