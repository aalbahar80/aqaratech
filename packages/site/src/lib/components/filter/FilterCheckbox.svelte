<script lang="ts">
	import {
		Popover,
		PopoverButton,
		PopoverGroup,
		PopoverPanel,
		Transition,
	} from '@rgossiaux/svelte-headlessui';

	import type { Filter } from '$lib/models/interfaces/filter.interface';

	import HeroiconsChevronDown20Solid from '~icons/heroicons/chevron-down-20-solid';

	export let filter: Filter;
	export let showCount = false;
</script>

<PopoverGroup class="hidden sm:flex sm:items-baseline sm:space-x-8">
	<Popover as="div" class="relative z-10 inline-block text-left">
		<div>
			<PopoverButton
				class="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
			>
				<span>{filter.label}</span>
				{#if showCount}
					<span
						class="ml-1.5 rounded bg-gray-200 py-0.5 px-1.5 text-xs font-semibold tabular-nums text-gray-700"
					>
						{filter.options.filter((o) => o.active).length}
					</span>
				{/if}

				<HeroiconsChevronDown20Solid
					class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
					aria-hidden="true"
				/>
			</PopoverButton>
		</div>

		<Transition
			enter="transition ease-out duration-100"
			enterFrom="transform opacity-0 scale-95"
			enterTo="transform opacity-100 scale-100"
			leave="transition ease-in duration-75"
			leaveFrom="transform opacity-100 scale-100"
			leaveTo="transform opacity-0 scale-95"
		>
			<PopoverPanel
				class="absolute mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none ltr:right-0 rtl:left-0"
			>
				<form class="space-y-4">
					{#each filter.options as option, optionIdx (option.value)}
						<div class="flex items-center">
							<input
								id={`filter-${filter.id}-${optionIdx}`}
								name={`${filter.id}[]`}
								checked={option.active}
								on:change={(e) => option.action(e)}
								type="checkbox"
								class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
							/>
							<label
								for={`filter-${filter.id}-${optionIdx}`}
								class="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
							>
								{option.label}
							</label>
						</div>
					{/each}
				</form>
			</PopoverPanel>
		</Transition>
	</Popover>
</PopoverGroup>
