import { createRouter } from './createRouter';
import { leases } from './leases';
import { transactions } from './transactions';

export const tenantRouter = createRouter()
	.merge('transactions:', transactions)
	.merge('leases:', leases);
