<script lang="ts">
	import { diff } from 'just-diff';
	import { cloneDeep } from 'lodash-es';
	import * as R from 'remeda';

	import { page } from '$app/stores';
	import type { PageData } from './$types';

	import { getRoute, PageType } from '@self/utils';

	import { createApi } from '$api';
	import { handleApiError } from '$api/handle-api-error';
	import { preventTabClose } from '$lib/actions/prevent-tab-close';
	import Arrow from '$lib/components/Arrow.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import ExpenseTree from '$lib/components/expense/ExpenseTree.svelte';
	import { addSuccessToast } from '$lib/stores/toast';
	import {
		fromHeirarchy,
		toHeirarchy,
		type ExpenseNode,
	} from '$lib/utils/expense-type-options';

	import Fa6SolidFloppyDisk from '~icons/fa6-solid/floppy-disk';
	import Fa6SolidPlus from '~icons/fa6-solid/plus';
	import HeroiconsCheck from '~icons/heroicons/check';

	export let data: PageData;

	$: original = data.categories;

	let root: ExpenseNode = toHeirarchy(cloneDeep(data.categories));

	$: newList = fromHeirarchy({ root, original });
	$: difference = diff(original, newList);

	const isMobile =
		typeof window !== 'undefined' &&
		/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.exec(
			navigator.userAgent,
		);
</script>

{#if isMobile}
	This page is not supported on mobile devices. Please use a desktop browser.
{:else}
	<a
		href={getRoute({
			entity: 'expenseCategory',
			pageType: PageType.New,
			params: $page.params,
		})}
		class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
	>
		<Fa6SolidPlus class="-ml-1 mr-2 hidden h-5 w-5 sm:block" />
		Create new category
	</a>

	<div class="flex flex-auto justify-between">
		<div class="w-full">
			<ExpenseTree node={root} bind:root />
		</div>
		<div
			use:preventTabClose={!!difference.length}
			class="sticky top-0 flex w-2/6 flex-initial flex-col self-start p-2"
		>
			<Button
				icon={HeroiconsCheck}
				text={difference.length ? `Save changes` : 'No pending changes'}
				disabled={difference.length === 0}
				as="button"
				class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				on:click={async () => {
					console.debug(difference);
					console.debug(newList);

					const organizationId = $page.params['organizationId'];

					// type workaround
					if (!organizationId) {
						throw new Error('Organization ID is required');
					}

					try {
						const res = await createApi().expenseCategories.updateAll({
							updateExpenseCategoryTreeDto: newList.map((category) =>
								R.omit(category, ['isGroup']),
							),
							organizationId,
						});
						data.categories = res;
						addSuccessToast();
					} catch (e) {
						console.error(e);
						await handleApiError(e);
					}
				}}
			>
				<Fa6SolidFloppyDisk />
			</Button>
			{#each difference as change}
				{@const newParentNode = newList.find(
					(node) => node.id === change.value,
				)}
				{@const changedNode =
					typeof change.path[0] === 'number' ? newList[change.path[0]] : null}
				<div class="flex items-center justify-between py-2 text-sm font-medium">
					<span class="w-5/12">
						{newParentNode?.labelEn ?? ''}
					</span>
					<Arrow />
					<span class="w-5/12 text-indigo-600">
						{changedNode?.labelEn}
					</span>
				</div>
			{/each}
		</div>
	</div>
{/if}
