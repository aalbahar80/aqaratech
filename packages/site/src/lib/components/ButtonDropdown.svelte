<script lang="ts">
	import type { MenuOption } from '$lib/models/interfaces/option.interface';
	import { Menu, MenuButton } from '@rgossiaux/svelte-headlessui';
	import { ChevronDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import DropdownMenu from './DropdownMenu.svelte';

	export let defaultOption: MenuOption;
	export let options: MenuOption[];
</script>

<span class="relative inline-flex rounded-md shadow-sm">
	{#if defaultOption.href}
		<a
			href={defaultOption.href}
			class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
		>
			{defaultOption.label}
		</a>
	{:else}
		<button
			type="button"
			class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
		>
			{defaultOption.label}
		</button>
	{/if}
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
		<DropdownMenu {options} class={$$props.class} />
	</Menu>
</span>
