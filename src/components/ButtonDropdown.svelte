<script lang="ts">
	import { Menu, MenuButton } from '@rgossiaux/svelte-headlessui';
	import { ChevronDown, Pencil, Trash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import DropdownMenu from './DropdownMenu.svelte';

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
		<DropdownMenu {items} />
	</Menu>
</span>
