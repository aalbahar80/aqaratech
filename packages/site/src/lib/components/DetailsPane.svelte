<script lang="ts">
	import Dropdown from '$lib/components/buttons/Dropdown.svelte';
	import DropdownMenu from '$lib/components/buttons/DropdownMenu.svelte';
	import HybridButton from '$lib/components/buttons/HybridButton.svelte';
	import MenuItemChild from '$lib/components/buttons/MenuItemChild.svelte';
	import MenuItemIcon from '$lib/components/buttons/MenuItemIcon.svelte';
	import { MenuItem } from '@rgossiaux/svelte-headlessui';
	import { PaperClip } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Fa6SolidTrashCan from '~icons/fa6-solid/trash-can';

	export let details: [string, string | null][];
	export let files: [string, string][] | undefined = [['a', 'df']];
</script>

<div id="detailsPane">
	<dl class="rounded-lg shadow">
		{#each details as [key, value]}
			<div class="row">
				<dt class="label">{key}</dt>
				<dd class="definition">{value ?? '-'}</dd>
			</div>
		{/each}
		{#if files?.length}
			<div class="row">
				<dt class="label">Files</dt>
				<dd class="definition">
					<ul
						class="divide-y divide-gray-200 rounded-md border border-gray-200"
					>
						{#each files as [key, value]}
							<li
								class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
							>
								<div class="flex w-0 flex-1 items-center">
									<Icon
										src={PaperClip}
										class="h-5 w-5 flex-shrink-0 text-gray-400"
										aria-hidden="true"
									/>
									<span class="ml-2 w-0 flex-1 truncate">{key}</span>
								</div>
								<Dropdown>
									<div slot="beforeButton">
										<a
											href={value}
											class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
										>
											View
										</a>
									</div>
									<div slot="button">
										<!-- Rename to HybridButtonChevron  -->
										<HybridButton />
									</div>
									<div slot="menu">
										<DropdownMenu>
											<MenuItem as="div" let:active>
												<button on:click={() => {}} class="w-full">
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
