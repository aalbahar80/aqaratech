<script context="module" lang="ts">
	import { trpc, type InferQueryOutput } from '$lib/client/trpc';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const { categories, groups } = await trpc(fetch).query(
			'public:expenses:meta',
		);
		return { props: { groups, categories } };
	};
</script>

<script lang="ts">
	export let groups: InferQueryOutput<'public:expenses:meta'>['groups'];
	export let categories: InferQueryOutput<'public:expenses:meta'>['categories'];

	const fetchGroups = async () => {
		({ groups } = await trpc().query('public:expenses:meta'));
		return groups;
	};

	const fetchCategories = async () => {
		({ categories } = await trpc().query('public:expenses:meta'));
		return categories;
	};
	$: console.log(categories, 'categories');
	$: console.log(groups, 'groups');
	const addGroup = async () => {
		groups = [...groups, { id: undefined, en: '', ar: '' }];
	};
	const addCategory = async () => {
		categories = [...categories, { en: '', ar: '' }];
	};
</script>

<!-- <Tabs
	tabs={[
		{ name: 'Expense Categories', icon: Trash },
		{ name: 'Expense Groups', icon: Trash },
	]}
/> -->
