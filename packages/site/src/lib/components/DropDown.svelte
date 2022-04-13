<script lang="ts">
	import type { Option } from '$lib/types';
	import { Menu, MenuButton } from '@rgossiaux/svelte-headlessui';
	import { DotsVertical } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import DropdownMenu from './DropdownMenu.svelte';

	export let options: Option[];
</script>

<Menu as="div" class="relative inline-block text-left align-middle">
	<div>
		<MenuButton
			class="flex items-center rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
		>
			<span class="sr-only">Open options</span>
			<Icon
				src={DotsVertical}
				class="h-5 w-5"
				aria-hidden="true"
				theme="solid"
			/>
		</MenuButton>
	</div>

	<DropdownMenu {options} class="bottom-10" />
</Menu>
