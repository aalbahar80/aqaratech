<script context="module" lang="ts">
	import Button from '$lib/components/buttons/Button.svelte';
	import ExpenseTree from '$lib/components/expense/ExpenseTree.svelte';
	import {
		fromHeirarchy,
		toHeirarchy,
		type ExpenseNode,
	} from '$lib/utils/expense-type-options';
	import { Check } from '@steeze-ui/heroicons';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';
	import Fa6SolidFloppyDisk from '~icons/fa6-solid/floppy-disk';
	import { differenceBy, clone, cloneDeep } from 'lodash-es';
	import { diff } from 'just-diff';
	import index from 'just-index';

	export const load = async ({ stuff, params }: LoadEvent<{ id: string }>) => {
		const settings = await stuff.api!.organizations.findSettings({
			id: params.id,
		});
		return { props: { settings } };
	};
</script>

<script lang="ts">
	// TODO rm
	import { onDestroy, setContext } from 'svelte';

	type Prop = LP<typeof load>;
	export let settings: Prop['settings'];

	const key = 'expenseTree';
	// const original = [...settings.expenseCategoryTree];
	const getOriginalTreeClone = () => [
		...cloneDeep(settings.expenseCategoryTree),
	];
	const original = getOriginalTreeClone();

	setContext(key, {
		getOriginalCategories: () => getOriginalTreeClone(),
	});

	let root: ExpenseNode = toHeirarchy(getOriginalTreeClone());
	$: newList = fromHeirarchy({
		hierarchy: root,
		original: getOriginalTreeClone(),
	});
	$: difference = diff(original, newList);

	$: console.warn({ original });
	$: console.warn({ newList });
	$: console.warn({ difference });
</script>

<!-- TODO rm -->
<div class:bg-red-500={original.find((c) => c.id === '5')?.parentId !== '2'}>
	<Button
		icon={Check}
		text="Save"
		as="button"
		class="inline-flex w-3/12 items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
		on:click={() => {
			console.log(
				settings.expenseCategoryTree.find((o) => o.id === '5')?.parentId,
				'35',
			);
			console.log(root.find((node) => node.data.id === '5'));
			console.log(root.find((node) => node.data.id === '2'));
			console.log(original);
			console.log(newList);
			console.log(difference);
		}}
	>
		<Fa6SolidFloppyDisk />
	</Button>
	<!-- TODO rm -->
	<pre>{JSON.stringify(
			original
				.filter((o) => o.id === '5')
				.map((o) => `${o.id}: ${o.labelEn} -- ${o.parentId}`),
			null,
			2,
		)}</pre>
	<pre>{JSON.stringify(
			newList
				.filter((o) => o.id === '5')
				.map((o) => `${o.id}: ${o.labelEn} -- ${o.parentId}`),
			null,
			2,
		)}</pre>
	<pre>{JSON.stringify(difference, null, 2)}</pre>

	<ExpenseTree node={root} bind:root />
</div>
