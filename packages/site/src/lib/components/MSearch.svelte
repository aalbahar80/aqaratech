<script lang="ts">
	import { classes } from '$lib/utils/classes';
	import {
		Dialog,
		TransitionChild,
		TransitionRoot,
	} from '@rgossiaux/svelte-headlessui';
	import { EmojiSad, Globe, Search } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	const items = [
		{ id: 1, name: 'Workflow Inc.', category: 'Clients', url: '#' },
		// More items...
	];

	let query = '';
	let open = true;

	const filteredItems =
		query === ''
			? []
			: items.filter((item) => {
					return item.name.toLowerCase().includes(query.toLowerCase());
			  });

	// make reactive
	const groups = filteredItems.reduce((groups, item) => {
		return {
			...groups,
			[item.category]: [...(groups[item.category] || []), item],
		};
	}, {});
</script>

<TransitionRoot show={open} on:afterLeave={() => (query = '')} appear>
	<Dialog
		as="div"
		class="relative z-10"
		on:close={() => {
			open = true;
		}}
	>
		<TransitionChild
			enter="ease-out duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="ease-in duration-200"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<div class="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
		</TransitionChild>

		<div class="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
			<TransitionChild
				enter="ease-out duration-300"
				enterFrom="opacity-0 scale-95"
				enterTo="opacity-100 scale-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-95"
			>
				<DialogPanel
					class="mx-auto max-w-xl transform overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
				>
					<Combobox on:change={(item) => (window.location = item.url)}>
						<div class="relative">
							<Icon
								src={Search}
								class="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
								aria-hidden="true"
								theme="solid"
							/>
							<ComboboxInput
								class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
								placeholder="Search..."
								on:change={(event) => setQuery(event.target.value)}
							/>
						</div>

						{#if query === ''}
							<div
								class="border-t border-gray-100 py-14 px-6 text-center text-sm sm:px-14"
							>
								<Icon
									src={Globe}
									class="mx-auto h-6 w-6 text-gray-400"
									aria-hidden="true"
									theme="outline"
								/>
								<p class="mt-4 font-semibold text-gray-900">
									Search for clients and projects
								</p>
								<p class="mt-2 text-gray-500">
									Quickly access clients and projects by running a global
									search.
								</p>
							</div>
						{/if}

						{#if filteredItems.length > 0}
							<ComboboxOptions
								static
								class="max-h-80 scroll-pt-11 scroll-pb-2 space-y-2 overflow-y-auto pb-2"
							>
								{#each Object.entries(groups) as [category, items] (category)}
									<li>
										<h2
											class="bg-gray-100 py-2.5 px-4 text-xs font-semibold text-gray-900"
										>
											{category}
										</h2>
										<ul class="mt-2 text-sm text-gray-800">
											{#each items as item (item.id)}
												<ComboboxOption
													value={item}
													class={({ active }) =>
														classes(
															'cursor-default select-none px-4 py-2',
															active && 'bg-indigo-600 text-white',
														)}
												>
													{item.name}
												</ComboboxOption>
											{/each}
										</ul>
									</li>
								{/each}
							</ComboboxOptions>
						{/if}

						{#if query !== '' && filteredItems.length === 0}
							<div
								class="border-t border-gray-100 py-14 px-6 text-center text-sm sm:px-14"
							>
								<Icon
									src={EmojiSad}
									class="mx-auto h-6 w-6 text-gray-400"
									aria-hidden="true"
									theme="outline"
								/>
								<p class="mt-4 font-semibold text-gray-900">No results found</p>
								<p class="mt-2 text-gray-500">
									We couldn’t find anything with that term. Please try again.
								</p>
							</div>
						{/if}
					</Combobox>
				</DialogPanel>
			</TransitionChild>
		</div>
	</Dialog>
</TransitionRoot>
