<script lang="ts">
	import {
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		Transition,
	} from '@rgossiaux/svelte-headlessui';
	import { ChevronDown, Pencil, Trash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	const items = [
		{ label: 'Update', href: '#', icon: Pencil },
		{ label: 'Remove', href: '#', icon: Trash },
	];
</script>

<span class="relative z-0 inline-flex rounded-md shadow-sm">
	<button
		type="button"
		class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
	>
		View
	</button>
	<Menu as="span" class="relative -ml-px block">
		<MenuButton
			class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
		>
			<span class="sr-only">Open options</span>
			<Icon
				src={ChevronDown}
				class="h-5 w-5"
				aria-hidden="true"
				theme="solid"
			/>
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
				class="absolute right-0 bottom-10 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				><div class="py-1">
					{#each items as item}
						<MenuItem
							let:active
							as="button"
							class="w-full"
							on:click={(e) => {
								console.log(e);
								console.log(`clicked ${item.label}`);
							}}
						>
							<div
								class="group flex items-center px-4 py-2 text-sm"
								class:bg-gray-100={active}
								class:text-gray-900={active}
								class:text-gray-700={!active}
							>
								<Icon
									src={item.icon}
									class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
									aria-hidden="true"
									theme="solid"
								/>
								{item.label}
							</div>
						</MenuItem>
					{/each}
				</div>
			</MenuItems>
		</Transition>
	</Menu>
</span>
