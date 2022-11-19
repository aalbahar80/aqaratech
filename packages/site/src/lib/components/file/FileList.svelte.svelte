<script lang="ts">
	import { createApi } from '$api';
	import type { PaginatedFileDto } from '$api/openapi';
	import { page } from '$app/stores';
	import Dropdown from '$lib/components/buttons/Dropdown.svelte';
	import DropdownMenu from '$lib/components/buttons/DropdownMenu.svelte';
	import HybridButton from '$lib/components/buttons/HybridButton.svelte';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import MenuItemChild from '$lib/components/buttons/MenuItemChild.svelte';
	import MenuItemIcon from '$lib/components/buttons/MenuItemIcon.svelte';
	import { addSuccessToast, handleApiError } from '$lib/stores/toast';
	import { getFormRouteWithRelation } from '$lib/utils/file';
	import RoleGuard from '$lib/utils/RoleGuard.svelte';
	import { MenuItem } from '@rgossiaux/svelte-headlessui';
	import { flip } from 'svelte/animate';
	import Fa6SolidPaperclip from '~icons/fa6-solid/paperclip';
	import Fa6SolidTrashCan from '~icons/fa6-solid/trash-can';
	import HeroiconsOutlinePaperClip from '~icons/heroicons-outline/paper-clip';
	import HeroiconsFolderOpen from '~icons/heroicons/folder-open';

	export let files: PaginatedFileDto;

	$: hideFileActions = $page.data.user?.role?.roleType !== 'ORGADMIN';
</script>

<RoleGuard roles={['ORGADMIN']}>
	<div class="flex justify-end">
		<a
			href={getFormRouteWithRelation({
				entity: 'file',
				pathname: $page.url.pathname,
				params: $page.params,
				redirectTo: $page.url.pathname,
			})}
		>
			<IconButton>
				<div slot="icon">
					<Fa6SolidPaperclip />
				</div>

				Attach files
			</IconButton>
		</a>
	</div>
</RoleGuard>

{#if files?.results.length}
	<ul
		class="divide-y divide-gray-200 rounded-md border border-gray-200 bg-white"
	>
		{#each files.results as file (file.key)}
			<li
				animate:flip={{ duration: 200 }}
				class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
				data-testid={file.key}
			>
				<div class="flex w-0 flex-1 items-center">
					<HeroiconsOutlinePaperClip
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
								const url = await createApi().files.findOne({
									key: file.key,
								});
								// opens in new tab because of content-disposition header
								window.open(url);
							}}
							class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
							class:rounded-md={hideFileActions}
						>
							View
						</button>
					</div>
					<div slot="button">
						<!-- Rename to HybridButtonChevron  -->
						{#if !hideFileActions}
							<HybridButton />
						{/if}
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
											await createApi().files.remove({
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
{:else}
	<div
		class="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
	>
		<HeroiconsFolderOpen
			class="mx-auto h-12 w-12 text-gray-400"
			aria-hidden="true"
		/>
		<span class="mt-2 block text-sm font-medium text-gray-900">
			Nothing here yet
		</span>
	</div>
{/if}
