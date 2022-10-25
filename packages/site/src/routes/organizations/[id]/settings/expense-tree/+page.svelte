<script lang="ts">
	import { createApi } from '$api';
	import { page } from '$app/stores';
	import Button from '$lib/components/buttons/Button.svelte';
	import ExpenseTree from '$lib/components/expense/ExpenseTree.svelte';
	import { addSuccessToast, handleApiError } from '$lib/stores/toast';
	import {
		fromHeirarchy,
		toHeirarchy,
		type ExpenseNode,
	} from '$lib/utils/expense-type-options';
	import { preventTabClose } from '$lib/utils/prevent-tab-close';
	import { Check } from '@steeze-ui/heroicons';
	import { diff } from 'just-diff';
	import { cloneDeep } from 'lodash-es';
	import * as R from 'remeda';
	import Fa6SolidFloppyDisk from '~icons/fa6-solid/floppy-disk';
	import Fa6SolidPlus from '~icons/fa6-solid/plus';
	import type { PageData } from './$types';

	export let data: PageData;

	$: original = data.categories;

	let root: ExpenseNode = toHeirarchy(cloneDeep(data.categories));

	$: newList = fromHeirarchy({ root, original });
	$: difference = diff(original, newList);
</script>

<a
	href={`/organizations/${$page.data.user?.role?.organizationId}/expenseCategories/new`}
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
			icon={Check}
			text={difference.length ? `Save changes` : 'No pending changes'}
			disabled={difference.length === 0}
			as="button"
			class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			on:click={() => {
				console.debug(difference);
				console.debug(newList);
				createApi()
					.expenseCategories.updateAll({
						updateExpenseCategoryTreeDto: newList.map((category) =>
							R.omit(category, ['isGroup']),
						),
					})
					.then((res) => {
						addSuccessToast();
						data.categories = res;
					})
					.catch(handleApiError);
			}}
		>
			<Fa6SolidFloppyDisk />
		</Button>
		{#each difference as change}
			{@const newParentNode = newList.find((node) => node.id === change.value)}
			{@const changedNode =
				typeof change.path[0] === 'number' ? newList[change.path[0]] : null}
			<div class="flex items-center justify-between py-2 text-sm font-medium">
				<span class="w-5/12">
					{newParentNode?.labelEn || ''}
				</span>
				<span aria-hidden="true"> &rarr; </span>
				<span class="w-5/12 text-indigo-600">
					{changedNode?.labelEn}
				</span>
			</div>
		{/each}
	</div>
</div>
