<script lang="ts">
	import { Check, Selector } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	const people = [
		{ id: 1, name: 'Steve Jobs' },
		{ id: 2, name: 'Bill Gates' },
		{ id: 3, name: 'Mark Zuckerberg' },
		{ id: 4, name: 'Elon Musk' },
		{ id: 5, name: 'Tim Cook' },
		{ id: 6, name: 'Steve Wozniak' },
		{ id: 7, name: 'Larry Page' },
		{ id: 8, name: 'Sergey Brin' },
		{ id: 9, name: 'Larry Ellison' },
		{ id: 10, name: 'Jack Dorsey' },
		{ id: 11, name: 'Jeff Bezos' },
		{ id: 12, name: 'Paul Allen' },
		{ id: 13, name: 'Peter Thiel' },
		{ id: 14, name: 'Michael Bloomberg' },
		{ id: 15, name: 'Jim Walton' },
		{ id: 16, name: 'Jack Ma' },
		{ id: 17, name: 'Jeff Bezo' },
		{ id: 18, name: 'Mark Cuban' },
		{ id: 19, name: 'Jack Dorsey' },
		{ id: 20, name: 'Jeff Bezos' },
		{ id: 21, name: 'Paul Allen' },
		{ id: 22, name: 'Peter Thiel' },
		{ id: 23, name: 'Michael Bloomberg' },
		{ id: 24, name: 'Jim Walton' },
		{ id: 25, name: 'Jack Ma' },
		{ id: 26, name: 'Jeff Bezo' },
		{ id: 27, name: 'Mark Cuban' },
		{ id: 28, name: 'Jack Dorsey' },
		{ id: 29, name: 'Jeff Bezos' },
		{ id: 30, name: 'Paul Allen' },
		{ id: 31, name: 'Peter Thiel' },
		{ id: 32, name: 'Michael Bloomberg' },
		{ id: 33, name: 'Jim Walton' },
		{ id: 34, name: 'Jack Ma' },
		{ id: 35, name: 'Jeff Bezo' },
		{ id: 36, name: 'Mark Cuban' },
		{ id: 37, name: 'Jack Dorsey' },
	];
	export let label = 'Assigned to';
	let selectedPerson = people[2];
	let open = false;
</script>

<div>
	<label for="combobox" class="block text-sm font-medium text-gray-700"
		>{label}</label
	>
	<div class="relative mt-1">
		<input
			id="combobox"
			type="text"
			class="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-12 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
			role="combobox"
			aria-controls="options"
			aria-expanded="false"
		/>
		<button
			type="button"
			class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
		>
			<Icon
				src={Selector}
				theme="solid"
				class="h-5 w-5 text-gray-400"
				aria-hidden="true"
			/>
		</button>

		{#if open}
			<ul
				class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
				id="options"
				role="listbox"
			>
				{#each people as person (person.id)}
					{@const selected = selectedPerson?.id === person.id}
					{@const active = false}
					<!-- Combobox option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation. -->
					<li
						class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
						class:text-gray-900={!active}
						class:text-white={active}
						class:bg-indigo-600={active}
						id="option-0"
						role="option"
						tabindex="-1"
					>
						<span class="block truncate" class:font-semibold={selected}
							>{person.name}</span
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
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
