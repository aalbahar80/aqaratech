<script lang="ts">
	import {
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		Transition,
	} from '@rgossiaux/svelte-headlessui';
	import {
		Check,
		ClipboardCopy,
		DotsVertical,
		PencilAlt,
		Speakerphone,
	} from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	const items = [
		{
			icon: PencilAlt,
			label: 'Edit',
		},
		{
			icon: ClipboardCopy,
			label: 'Copy URL',
		},
		{
			icon: Speakerphone,
			label: 'Send reminder',
		},
		{
			icon: Check,
			label: 'Mark as paid',
		},
	];
</script>

<Menu as="div" class="relative inline-block text-left">
	<div>
		<MenuButton
			class="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
		>
			<span class="sr-only">Open options</span>
			<Icon src={DotsVertical} class="h-5 w-5" aria-hidden="true" />
		</MenuButton>
	</div>

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
			class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
