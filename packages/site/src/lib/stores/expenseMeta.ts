import { trpc, type InferQueryOutput } from '$lib/client/trpc.js';
import { writable, type Writable } from 'svelte/store';

type Data = InferQueryOutput<'public:expenses:meta'>;
type CategoryOptions = Awaited<ReturnType<typeof getExpenseCategories>>;

export const categories: Writable<CategoryOptions> = writable([]);

export function getExpenseCategories(data: Data) {
	const expenseCategories = data.categories;
	const categoryOptions =
		expenseCategories !== undefined
			? expenseCategories.map((cat) => ({
					label: `${cat.en} - ${cat.ar}`,
					value: cat.id,
			  }))
			: [];
	const options = [{ label: '', value: null }, ...categoryOptions];
	return options;
}

export const getExpenseMeta = async () => {
	const expenseMeta = await trpc().query('public:expenses:meta');
	return getExpenseCategories(expenseMeta);
};
