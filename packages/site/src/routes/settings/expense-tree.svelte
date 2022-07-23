<script context="module" lang="ts">
	import Button from '$lib/components/buttons/Button.svelte';
	import ExpenseTree from '$lib/components/expense/ExpenseTree.svelte';
	import {
		getExpenseTypeTree,
		getUpdatedExpenses,
		type Nodes,
	} from '$lib/utils/expense-type-options';
	import { Check } from '@steeze-ui/heroicons';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';
	import Fa6SolidFloppyDisk from '~icons/fa6-solid/floppy-disk';

	export const load = async ({ stuff }: LoadEvent) => {
		const expenseTypes = await stuff.api!.meta.findExpenseTypes();
		return { props: { expenseTypes } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let expenseTypes: Prop['expenseTypes'];

	let nodes: Nodes = {};

	// add a root node where it's items are the root expense types with no parent
	nodes.root = {
		id: 'root',
		labelEn: '',
		items: expenseTypes
			.filter((t) => !t.parentId)
			.map((t) => ({ id: t.id, labelEn: t.labelEn })),
	};

	expenseTypes.forEach((expenseType) => {
		nodes[expenseType.id] = {
			...expenseType,
			items: getExpenseTypeTree(expenseType, expenseTypes),
		};
	});

	// $: console.log(nodes);
</script>

<Button
	icon={Check}
	text="Save"
	as="button"
	class="inline-flex w-3/12 items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
	on:click={() => {
		const updated = getUpdatedExpenses(nodes);
		console.log({ updated }, 'sample4.svelte ~ 63');
	}}
>
	<Fa6SolidFloppyDisk />
</Button>

<ExpenseTree node={nodes['root']} bind:nodes />
