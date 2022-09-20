<script lang="ts">
	import { page } from '$app/stores';
	import { api } from '$api';
	import Dropdown from '$lib/components/buttons/Dropdown.svelte';
	import DropdownMenu from '$lib/components/buttons/DropdownMenu.svelte';
	import HybridButton from '$lib/components/buttons/HybridButton.svelte';
	import MenuItemChild from '$lib/components/buttons/MenuItemChild.svelte';
	import MenuItemIcon from '$lib/components/buttons/MenuItemIcon.svelte';
	import { addSuccessToast, handleApiError } from '$lib/stores/toast';
	import { hasFileSupport } from '$lib/utils/file';
	import { inferRoute } from '$lib/utils/route-helpers';
	import { MenuItem } from '@rgossiaux/svelte-headlessui';
	import type { PaginatedFileDto } from '$api/open-api';
	import { PaperClip } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import Fa6SolidTrashCan from '~icons/fa6-solid/trash-can';

	export let details: [string, string | null][];
	let files: PaginatedFileDto | undefined = undefined;

	onMount(async () => {
		const route = inferRoute($page.url.pathname);
		try {
			if (hasFileSupport(route.entity.title))
				files = await api($page.data.apiConfig).files.findAll({
					relationKey: route.entity.title,
					relationValue: route.id,
				});
		} catch (e) {
			handleApiError(e);
		}
	});
</script>

<div id="detailsPane">
	<dl class="rounded-lg shadow">
		{#each details as [key, value]}
			<div class="row">
				<dt class="label">{key}</dt>
				<dd class="definition">{value ?? '-'}</dd>
			</div>
		{/each}
		{#if files?.results.length}
			<div class="row">
				<dt class="label">Files</dt>
				<dd class="definition">
					<ul
						class="divide-y divide-gray-200 rounded-md border border-gray-200"
					>
						{#each files.results as file (file.key)}
							<li
								animate:flip={{ duration: 200 }}
								class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
								data-testid={file.key}
							>
								<div class="flex w-0 flex-1 items-center">
									<Icon
										src={PaperClip}
										class="h-5 w-5 flex-shrink-0 text-gray-400"
										aria-hidden="true"
									/>
									<span class="ml-2 w-0 flex-1 truncate">
										{file.key.split('/').slice(-1)}
									</span>
								</div>
								<Dropdown>
									<div slot="beforeButton">
										<button
											on:click={async () => {
												// encode file name to avoid special characters
												const url = await api(
													$page.data.apiConfig,
												).files.findOne({
													key: file.key,
												});
												// opens in new tab because of content-disposition header
												window.open(url);
											}}
											class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
										>
											View
										</button>
									</div>
									<div slot="button">
										<!-- Rename to HybridButtonChevron  -->
										<HybridButton />
									</div>
									<div slot="menu">
										<DropdownMenu>
											<MenuItem as="div" let:active>
												<button
													class="w-full"
													on:click={async () => {
														try {
															if (!files) {
																// redundant type check
																return;
															}
															// encode file name to avoid special characters
															await api($page.data.apiConfig).files.remove({
																key: file.key,
															});
															files.results = [...files.results].filter(
																(f) => f.key !== file.key,
															);
															addSuccessToast();
														} catch (e) {
															console.error(e);
															handleApiError(e);
														}
													}}
												>
													<MenuItemChild {active}>
														<MenuItemIcon icon={Fa6SolidTrashCan} />
														Delete
													</MenuItemChild>
												</button>
											</MenuItem>
										</DropdownMenu>
									</div>
								</Dropdown>
							</li>
						{/each}
					</ul>
				</dd>
			</div>
		{/if}
	</dl>
</div>

<style lang="postcss">
	.row {
		@apply px-4 py-5 first:rounded-t-md last:rounded-b-md odd:bg-gray-50 even:bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6;
	}
	.label {
		@apply text-sm font-medium text-gray-500;
	}
	.definition {
		@apply mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0;
	}
</style>
