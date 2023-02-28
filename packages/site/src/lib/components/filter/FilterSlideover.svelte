<script lang="ts">
	import {
		Dialog,
		DialogOverlay,
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		TransitionChild,
		TransitionRoot,
	} from '@rgossiaux/svelte-headlessui';

	import type { Filter } from '$lib/models/interfaces/filter.interface';

	import L from '$i18n/i18n-svelte';
	import { classes } from '$lib/utils/classes';
	import HeroiconsChevronDown20Solid from '~icons/heroicons/chevron-down-20-solid';
	import HeroiconsXMark20Solid from '~icons/heroicons/x-mark-20-solid';

	export let filters: Filter[];

	let isOpen = false;
	export const close = () => {
		isOpen = false;
	};
	export const open = () => {
		isOpen = true;
	};
</script>

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
			enterFrom="ltr:translate-x-full rtl:-translate-x-full"
			enterTo="translate-x-0"
			leave="transition ease-in-out duration-300 transform"
			leaveFrom="translate-x-0"
			leaveTo="ltr:translate-x-full rtl:-translate-x-full"
		>
			<div
				class="relative ml-auto flex h-full w-52 max-w-xs flex-col overflow-y-auto bg-white pt-52 pb-6 shadow-xl"
			>
				<div class="flex items-center justify-between px-4">
					<h2 class="text-lg font-medium text-gray-900">
						{$L.filter.filters()}
					</h2>
					<button
						type="button"
						class="flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 ltr:-mr-2 rtl:-ml-2"
						on:click={close}
					>
						<span class="sr-only">Close menu</span>
						<HeroiconsXMark20Solid class="h-5 w-5" aria-hidden="true" />
					</button>
				</div>

				<!-- Filters -->
				<form class="mt-4">
					{#each filters as filter (filter.label)}
						<Disclosure
							as="div"
							class="border-t border-gray-200 px-4 py-6"
							let:open
						>
							<h3 class="-mx-2 -my-3 flow-root">
								<DisclosureButton
									class="flex w-full items-center justify-between bg-white px-2 py-3 text-sm text-gray-400"
								>
									<span class="font-medium text-gray-900">{filter.label}</span>
									<span class="ms-6 flex items-center">
										<HeroiconsChevronDown20Solid
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
									{#each filter.options as option, optionIdx (option.value)}
										<div class="flex items-center">
											<input
												id={`filter-mobile-${filter.id}-${optionIdx}`}
												name={`${filter.id}[]`}
												checked={option.active}
												on:change={(e) => option.action(e)}
												type={filter.type}
												class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
												class:rounded={filter.type === 'checkbox'}
											/>
											<label
												for={`filter-mobile-${filter.id}-${optionIdx}`}
												class="ms-3 text-sm text-gray-700"
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
