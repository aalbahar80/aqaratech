import { router } from '@trpc/server';
import type { Context } from '../../config';
import { expenses } from './expenses';
import { transactions } from './transactions';

export const publicRouter = router<Context>()
	.merge('transactions:', transactions)
	.merge('expenses:', expenses);
