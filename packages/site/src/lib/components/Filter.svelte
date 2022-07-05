<script lang="ts">
	import FilterCheckbox from '$lib/components/filter/FilterCheckbox.svelte';
	import FilterRadio from '$lib/components/filter/FilterRadio.svelte';
	import { classes } from '$lib/utils';
	import {
		Dialog,
		DialogOverlay,
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		TransitionChild,
		TransitionRoot,
	} from '@rgossiaux/svelte-headlessui';
	import { ChevronDown, X } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	interface Filter {
		id: string;
		name: string;
		options: {
			value: string;
			label: string;
			checked: boolean;
			action: () => void;
		}[];
	}

	interface SortOption {
		name: string;
		value: string;
	}

	export let sortOptions: SortOption[];
	export let filters: Filter[];

	let isOpen = false;
	const close = () => {
		isOpen = false;
	};
	const open = () => {
		isOpen = true;
	};
</script>

<div class="bg-gray-50">
	<!-- Mobile filter dialog -->
	<TransitionRoot show={isOpen}>
		<Dialog
			as="div"
			class="fixed inset-0 z-40 flex flex-row-reverse sm:hidden"
			on:close={close}
		>
			<TransitionChild
				enter="transition-opacity ease-linear duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity ease-linear duration-300"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<DialogOverlay class="fixed inset-0 bg-black bg-opacity-25" />
			</TransitionChild>

			<TransitionChild
				enter="transition ease-in-out duration-300 transform"
				enterFrom="translate-x-full"
				enterTo="translate-x-0"
				leave="transition ease-in-out duration-300 transform"
				leaveFrom="translate-x-0"
				leaveTo="translate-x-full"
			>
				<div
					class="relative ml-auto flex h-full w-52 max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl"
				>
					<div class="flex items-center justify-between px-4">
						<h2 class="text-lg font-medium text-gray-900">Filters</h2>
						<button
							type="button"
							class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
							on:click={close}
						>
							<span class="sr-only">Close menu</span>
							<Icon src={X} class="h-6 w-6" aria-hidden="true" />
						</button>
					</div>

					<!-- Filters -->
					<form class="mt-4">
						{#each filters as section (section.name)}
							<Disclosure
								as="div"
								class="border-t border-gray-200 px-4 py-6"
								let:open
							>
								<h3 class="-mx-2 -my-3 flow-root">
									<DisclosureButton
										class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400"
									>
										<span class="font-medium text-gray-900">{section.name}</span
										>
										<span class="ml-6 flex items-center">
											<Icon
												src={ChevronDown}
												theme="solid"
												class={classes(
													open ? '-rotate-180' : 'rotate-0',
													'h-5 w-5 transform',
												)}
												aria-hidden="true"
											/>
										</span>
									</DisclosureButton>
								</h3>
								<DisclosurePanel class="pt-6">
									<div class="space-y-6">
										{#each section.options as option, optionIdx (option.value)}
											<div class="flex items-center">
												<input
													id={`filter-mobile-${section.id}-${optionIdx}`}
													name={`${section.id}[]`}
													checked={option.checked}
													on:change={() => option.action()}
													type="checkbox"
													class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
												/>
												<label
													for={`filter-mobile-${section.id}-${optionIdx}`}
													class="ml-3 text-sm text-gray-500"
												>
													{option.label}
												</label>
											</div>
										{/each}
									</div>
								</DisclosurePanel>
							</Disclosure>
						{/each}
					</form>
				</div>
			</TransitionChild>
		</Dialog>
	</TransitionRoot>

	<div class="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
		<!-- <div class="py-24">
			<h1 class="text-4xl font-extrabold tracking-tight text-gray-900">
				New Arrivals
			</h1>
			<p class="mx-auto mt-4 max-w-3xl text-base text-gray-500">
				Thoughtfully designed objects for the workspace, home, and travel.
			</p>
		</div> -->

		<section
			aria-labelledby="filter-heading"
			class="border-t border-gray-200 py-6"
		>
			<h2 id="filter-heading" class="sr-only">Product filters</h2>

			<div class="flex items-center justify-between">
				<FilterRadio {sortOptions} />

				<button
					type="button"
					class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
					on:click={open}
				>
					Filters
				</button>
				{#each filters as section (section.name)}
					<FilterCheckbox {section} />
				{/each}
			</div>
		</section>
	</div>
</div>
