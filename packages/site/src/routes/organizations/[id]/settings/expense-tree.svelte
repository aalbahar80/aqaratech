<script context="module" lang="ts">
	import { page } from '$app/stores';
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

	export const load = async ({ stuff, params }: LoadEvent<{ id: string }>) => {
		const settings = await stuff.api!.organizations.findSettings({
			id: params.id,
		});
		return { props: { settings } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let settings: Prop['settings'];

	let nodes: Nodes = {};

	// add a root node where it's items are the root expense types with no parent
	nodes.root = {
		id: 'root',
		labelEn: '',
		items: settings.expenseCategoryTree
			.filter((t) => !t.parentId)
			.map((t) => ({ id: t.id, labelEn: t.labelEn })),
	};

	settings.expenseCategoryTree.forEach((expenseType) => {
		nodes[expenseType.id] = {
			...expenseType,
			items: getExpenseTypeTree(expenseType, settings.expenseCategoryTree),
		};
	});

	// $: console.log(nodes);
</script>

<Button
	icon={Check}
	text="Save"
	as="button"
	class="inline-flex w-3/12 items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
	on:click={async () => {
		const updated = getUpdatedExpenses(nodes);
		console.log({ updated }, 'expense-tree.svelte ~ 54');
		const saved = await $page.stuff.api.organizations.updateSettings({
			id: $page.params.id,
			updateOrganizationSettingsDto: {
				expenseCategoryTree: updated,
			},
		});
		console.log({ saved }, 'expense-tree.svelte ~ 55');
	}}
>
	<Fa6SolidFloppyDisk />
</Button>

<ExpenseTree node={nodes['root']} bind:nodes />
