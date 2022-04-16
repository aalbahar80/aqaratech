import { router } from '@trpc/server';
import type { Context } from '../../config';
import { transactions } from './transactions';

export const publicRouter = router<Context>().merge(
	'transactions:',
	transactions,
);
