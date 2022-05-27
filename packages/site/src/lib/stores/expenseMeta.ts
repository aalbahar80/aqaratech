import { trpc } from '$lib/client/trpc.js';
import { writable, type Writable } from 'svelte/store';

async function getExpenseCategories() {
	const meta = await trpc().query('public:expenses:meta');
	const categories = meta.categories;
	const categoryOptions =
		categories !== undefined
			? categories.map((cat) => ({
					label: `${cat.en} - ${cat.ar}`,
					value: cat.id,
			  }))
			: [];
	const options = [{ label: '', value: null }, ...categoryOptions];
	return { options, meta }; // simplify this by removing from stuff, only after chart stores are updated
}

type CategoryOptions = Awaited<
	ReturnType<typeof getExpenseCategories>
>['options'];

export const categories: Writable<CategoryOptions> = writable([]);

export const fetchItems = async () => {
	const result = await getExpenseCategories();

	categories.set(result.options);

	return result.meta;
};

// fetchItems();
