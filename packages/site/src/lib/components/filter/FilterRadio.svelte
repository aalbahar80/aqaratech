<script lang="ts">
	import { page } from '$app/stores';
	import { classes } from '$lib/utils';
	import {
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		Transition,
	} from '@rgossiaux/svelte-headlessui';
	import { ChevronDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	interface SortOption {
		name: string;
		value: string;
	}

	export let sortOptions: SortOption[];
</script>

<Menu as="div" class="relative z-10 inline-block text-left">
	<div>
		<MenuButton
			class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
		>
			Sort
			<Icon
				src={ChevronDown}
				theme="solid"
				class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
				aria-hidden="true"
			/>
		</MenuButton>
	</div>

	<Transition
		enter="transition ease-out duration-100"
		enterFrom="transform opacity-0 scale-95"
		enterTo="transform opacity-100 scale-100"
		leave="transition ease-in duration-75"
		leaveFrom="transform opacity-100 scale-100"
		leaveTo="transform opacity-0 scale-95"
	>
		<MenuItems
			class="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
		>
			<div class="py-1">
				{#each sortOptions as option (option.name)}
					{@const active =
						option.value === $page.url.searchParams.get('orderBy')}
					<MenuItem>
						<a
							sveltekit:noscroll
							sveltekit:prefetch
							href={`?orderBy=${option.value}&sortOrder=desc`}
							class={classes(
								active ? 'bg-gray-100' : '',
								'block px-4 py-2 text-sm font-medium text-gray-900',
							)}
						>
							{option.name}
						</a>
					</MenuItem>
				{/each}
			</div>
		</MenuItems>
	</Transition>
</Menu>
