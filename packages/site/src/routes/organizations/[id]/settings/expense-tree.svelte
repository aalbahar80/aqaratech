<script context="module" lang="ts">
	import Button from '$lib/components/buttons/Button.svelte';
	import ExpenseTree from '$lib/components/expense/ExpenseTree.svelte';
	import {
		toHeirarchy,
		type ExpenseNode,
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
	// TODO rm
	import { onDestroy, setContext } from 'svelte';

	type Prop = LP<typeof load>;
	export let settings: Prop['settings'];

	const key = 'expenseTree';
	// const original = [...settings.expenseCategoryTree];
	const original = settings.expenseCategoryTree;

	setContext(key, {
		getOriginalCategories: () => original,
	});

	// let root: ExpenseNode = toHeirarchy(settings.expenseCategoryTree);
	let root: ExpenseNode = toHeirarchy([...settings.expenseCategoryTree]);
	// TODO rm
	// $: console.log(settings.expenseCategoryTree.find((c) => c.id === '7'));
</script>

<!-- TODO rm -->
<div class:bg-red-500={original.find((c) => c.id === '5')?.parentId !== '2'}>
	<Button
		icon={Check}
		text="Save"
		as="button"
		class="inline-flex w-3/12 items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
		on:click={() => {
			console.log(original);
		}}
	>
		<Fa6SolidFloppyDisk />
	</Button>
	<!-- TODO rm -->
	<pre>{JSON.stringify(
			original.map((o) => `${o.id}: ${o.labelEn} -- ${o.parentId}`),
			null,
			2,
		)}</pre>
	<ExpenseTree node={root} bind:root />
</div>
