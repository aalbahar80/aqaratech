import prismaClient from '$lib/server/prismaClient';
import { router } from '@trpc/server';

export const expenses = router().query('meta', {
	resolve: async () => {
		const [categories, groups] = await Promise.all([
			prismaClient.expenseCategory.findMany(),
			prismaClient.expenseGroup.findMany(),
		]);
		return { categories, groups };
	},
});
