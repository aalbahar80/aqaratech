<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { createApi } from '$api';
	import SearchItem from '$lib/components/search/SearchItem.svelte';
	import {
		Dialog,
		DialogOverlay,
		Listbox,
		ListboxOptions,
		TransitionChild,
		TransitionRoot,
	} from '@rgossiaux/svelte-headlessui';
	import type { SearchDto } from '$api/openapi';
	import { entitiesMap, isEntity } from '@self/utils';
	import { EmojiSad, Globe, Search } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	// TODO optimize use lodash debounce?
	import debounce from 'debounce';
	import { flip } from 'svelte/animate';
	import HeroiconsOutlineFolder from '~icons/heroicons-outline/folder';
	import HeroiconsOutlineOfficeBuilding from '~icons/heroicons-outline/office-building';
	import HeroiconsOutlineUser from '~icons/heroicons-outline/user';

	let groups: SearchDto[] = [];

	let query = '';
	export let open = false;

	const search = debounce(async (q: string) => {
		if (!q || !$page.data.user?.role?.organizationId) return;
		try {
			groups = await createApi().organizations.search({
				organizationId: $page.data.user.role.organizationId,
				query: q,
			});
		} catch (e) {
			console.error(e);
		}
	}, 300);

	$: search(query);
	$: hasHits = Object.values(groups).some(
		(groupHits) => groupHits.estimatedTotalHits > 0,
	);

	const icons: Record<string, any> = {
		tenant: HeroiconsOutlineUser,
		portfolio: HeroiconsOutlineFolder,
		property: HeroiconsOutlineOfficeBuilding,
	};
</script>

<TransitionRoot show={open} on:afterLeave={() => (query = '')} appear>
	<Dialog
		class="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20"
		on:close={() => {
			open = false;
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
			<!-- <div class="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" /> -->
			<DialogOverlay
				class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
			/>
		</TransitionChild>

		<TransitionChild
			enter="ease-out duration-300"
			enterFrom="opacity-0 scale-95"
			enterTo="opacity-100 scale-100"
			leave="ease-in duration-200"
			leaveFrom="opacity-100 scale-100"
			leaveTo="opacity-0 scale-95"
		>
			<div
				class="mx-auto max-w-xl transform overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
			>
				<Listbox
					on:change={(item) => {
						goto(item.detail.url, { noscroll: true });
						open = false;
					}}
				>
					<div class="relative">
						<Icon
							src={Search}
							class="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
							aria-hidden="true"
							theme="solid"
						/>
						<input
							class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
							placeholder="Search..."
							type="text"
							on:input={(event) => {
								query = event.currentTarget?.value;
							}}
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
								Search for tenants, portfolios, or properties.
							</p>
							<p class="mt-2 text-gray-500">Search by name, address, etc.</p>
						</div>
					{/if}

					{#if hasHits && query !== ''}
						<ListboxOptions static>
							<div
								class="max-h-80 scroll-pt-11 scroll-pb-2 space-y-2 overflow-y-auto pb-2"
								style="max-height: 70vh"
							>
								{#each groups as group (group.entityTitle)}
									{@const entityTitle = group.entityTitle}
									{#if isEntity(entityTitle)}
										<li>
											<h2
												class="bg-gray-100 py-2.5 px-4 text-xs font-semibold text-gray-900"
											>
												{entitiesMap[entityTitle].pluralCap}
											</h2>
											<ul class="mt-2 text-sm text-gray-800">
												{#each group.hits as item (item.id)}
													<div animate:flip={{ duration: 300 }}>
														<SearchItem {item} icon={icons[entityTitle]} />
													</div>
												{/each}
											</ul>
										</li>
									{/if}
								{/each}
							</div>
						</ListboxOptions>
					{/if}

					{#if query !== '' && !hasHits}
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
				</Listbox>
			</div>
		</TransitionChild>
	</Dialog>
</TransitionRoot>
