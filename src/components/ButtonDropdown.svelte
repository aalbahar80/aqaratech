<script lang="ts">
	import {
		Transition,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
	} from '@rgossiaux/svelte-headlessui';
	import { ChevronDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	const items = [
		{ name: 'Save and schedule', href: '#' },
		{ name: 'Save and publish', href: '#' },
		{ name: 'Export PDF', href: '#' },
	];
</script>

<span class="relative inline-flex rounded-md shadow-sm">
	<button
		type="button"
		class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
	>
		Save changes
	</button>
	<Menu as="div" class="relative -ml-px block">
		<MenuButton
			class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
		>
			<span class="sr-only">Open options</span>
			<Icon src={ChevronDown} class="h-5 w-5" aria-hidden="true" />
		</MenuButton>
		<Transition
			as="div"
			enter="transition ease-out duration-100"
			enterFrom="transform opacity-0 scale-95"
			enterTo="transform opacity-100 scale-100"
			leave="transition ease-in duration-75"
			leaveFrom="transform opacity-100 scale-100"
			leaveTo="transform opacity-0 scale-95"
		>
			<MenuItems
				class="absolute right-0 bottom-10 z-10 mt-2 -mr-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			>
				<div class="py-1">
					{#each items as item (item.name)}
						<MenuItem let:active as="button" class="w-full">
							<div
								class={`${
									active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
								},'text-sm', block px-4 py-2`}
							>
								{item.name}
							</div>
						</MenuItem>
					{/each}
				</div>
			</MenuItems>
		</Transition>
	</Menu>
</span>
