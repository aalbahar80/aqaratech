<script lang="ts">
	import {
		Dialog,
		DialogOverlay,
		Listbox,
		ListboxOptions,
		TransitionChild,
		TransitionRoot,
	} from '@rgossiaux/svelte-headlessui';
	import debounce from 'debounce';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { flip } from 'svelte/animate';
	import { getRoute, isEntity, PageType } from '@self/utils';

	import type { HitDto, SearchDto } from '$api/openapi';
	import type { Icon } from '$lib/models/types/icon.type';

	import { createApi } from '$api';
	import L from '$i18n/i18n-svelte';
	import SearchItem from '$lib/components/search/SearchItem.svelte';
	import SearchPlaceholder from '$lib/components/search/SearchPlaceholder.svelte';
	import { objectEntries } from '$lib/utils/common';
	import HeroiconsMagnifyingGlass from '~icons/heroicons/magnifying-glass';
	import HeroiconsOutlineEmojiSad from '~icons/heroicons-outline/emoji-sad';
	import HeroiconsOutlineFolder from '~icons/heroicons-outline/folder';
	import HeroiconsOutlineOfficeBuilding from '~icons/heroicons-outline/office-building';
	import HeroiconsOutlineUser from '~icons/heroicons-outline/user';

	let groups: Record<keyof SearchDto, HitDto[]> = {
		// let groups: SearchDto = {
		portfolio: [],
		property: [],
		tenant: [],
	};

	let query = '';
	export let open = false;

	// TODO: use getSearch() if refactoring
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

	$: void search(query);

	$: hasHits =
		groups &&
		Object.values(groups).some((n) => Array.isArray(n) && n.length > 0);

	const icons: Record<string, Icon> = {
		tenant: HeroiconsOutlineUser,
		portfolio: HeroiconsOutlineFolder,
		property: HeroiconsOutlineOfficeBuilding,
	};
</script>

<!-- Prevent layout shift using position:absolute -->
<div class="absolute">
	<TransitionRoot
		show={open}
		on:afterLeave={() => (query = '')}
		appear
	>
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
						on:change={(e) => {
							const url = getRoute({
								entity: e.detail.entity,
								id: e.detail.id,
								pageType: PageType.Id,
								params: {
									organizationId: e.detail.organizationId,
									portfolioId: e.detail.portfolioId,
									lang: $page.params['lang'] ?? 'en', // HACK: svelte type limitation
								},
							});
							void goto(url, { noScroll: true });
							open = false;
						}}
					>
						<div class="relative">
							<HeroiconsMagnifyingGlass
								class="pointer-events-none absolute top-3.5 h-5 w-5 text-gray-400 ltr:left-4 rtl:right-4"
								aria-hidden="true"
							/>
							<input
								class="h-12 w-full border-0 bg-transparent text-gray-800 placeholder-gray-400 focus:ring-0 ltr:pl-11 rtl:pr-11 sm:text-sm"
								placeholder={`${$L.buttons.search()}...`}
								type="text"
								on:input={(event) => {
									query = event.currentTarget?.value;
								}}
							/>
						</div>

						{#if query === ''}
							<SearchPlaceholder />
						{/if}

						{#if hasHits && query !== ''}
							<ListboxOptions static>
								<div
									class="max-h-80 scroll-pb-2 scroll-pt-11 space-y-2 overflow-y-auto pb-2"
									style:max-height="70vh"
								>
									{#each objectEntries(groups) as [entityTitle, group] (entityTitle)}
										{#if isEntity(entityTitle) && group.length > 0}
											<li>
												<h2
													class="bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-900"
												>
													{$L.entity[entityTitle].plural()}
												</h2>
												<ul class="mt-2 text-sm text-gray-800">
													{#each group as item (item.id)}
														<div animate:flip={{ duration: 300 }}>
															<SearchItem
																{item}
																icon={icons[entityTitle] ??
																	HeroiconsOutlineFolder}
															/>
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
								class="border-t border-gray-100 px-6 py-14 text-center text-sm sm:px-14"
							>
								<HeroiconsOutlineEmojiSad
									class="mx-auto h-6 w-6 text-gray-400"
									aria-hidden="true"
								/>
								<p class="mt-4 font-semibold text-gray-900">
									{$L.search.noResults()}
								</p>
								<!-- <p class="mt-2 text-gray-500"> -->
								<!-- 	We couldn’t find anything with that term. Please try again. -->
								<!-- </p> -->
							</div>
						{/if}
					</Listbox>
				</div>
			</TransitionChild>
		</Dialog>
	</TransitionRoot>
</div>
