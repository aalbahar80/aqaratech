import prismaClient from '$lib/server/prismaClient';
import { router } from '@trpc/server';

export const expenses = router().query('meta', {
	resolve: async () => {
		const [categories, groups] = await Promise.all([
			prismaClient.expenseCategory.findMany(),
			prismaClient.expenseGroup.findMany(),
		]);
		console.log({ categories }, 'expenses.ts ~ 14');
		console.log({ groups }, 'expenses.ts ~ 16');
		return { categories, groups };
	},
});
