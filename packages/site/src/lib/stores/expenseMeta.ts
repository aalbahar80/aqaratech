import { trpc } from '$lib/client/trpc';
import { writable, type Writable } from 'svelte/store';

export async function getExpenseCategories() {
	const meta = await trpc().query('public:expenses:meta');
	const categories = meta.categories;
	const categoryOptions =
		categories !== undefined
			? categories.map((cat) => ({
					label: `${cat.en} - ${cat.ar}`,
					value: cat.id,
			  }))
			: [];
	return [{ label: '', value: null }, ...categoryOptions];
}

type CategoryOptions = Awaited<ReturnType<typeof getExpenseCategories>>;

export const categories: Writable<CategoryOptions> = writable([]);

const fetchItems = async () => {
	const result = await getExpenseCategories();

	categories.set(result);
};

fetchItems();
