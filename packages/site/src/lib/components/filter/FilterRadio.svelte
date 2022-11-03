<script lang="ts">
	import type { Filter } from '$lib/models/interfaces/filter.interface';
	import { classes } from '$lib/utils/classes';
	import {
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		Transition,
	} from '@rgossiaux/svelte-headlessui';
	import { ChevronDown } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let filter: Filter;
	export let align = 'left';
</script>

<Menu as="div" class="relative z-10 inline-block text-left">
	<div>
		<MenuButton
			class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
		>
			{filter.label}
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
			class={classes(
				align === 'left'
					? 'left-0 origin-top-left'
					: 'right-0 origin-top-right',
				'absolute z-10 mt-2 w-40  rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none',
			)}
		>
			<div class="py-1">
				<slot>
					{#each filter.options as option (option.label)}
						<MenuItem>
							<label
								class={classes(
									option.active ? 'bg-gray-100' : '',
									'block px-4 py-2 text-sm font-medium text-gray-900',
								)}
							>
								<input
									type="radio"
									name="sort"
									value={option.value}
									on:change={(e) => option.action(e)}
									class="hidden"
								/>
								{option.label}
							</label>
						</MenuItem>
					{/each}
				</slot>
			</div>
		</MenuItems>
	</Transition>
</Menu>
