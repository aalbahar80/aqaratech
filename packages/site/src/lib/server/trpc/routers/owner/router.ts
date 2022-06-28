import { charts } from './charts';
import { createRouter } from './createRouter';
import { expenses } from './expenses';
import { leases } from './leases';
import { properties } from './properties';
import { units } from './units';
import { transactions } from './transactions';

export const ownerRouter = createRouter()
	.merge('properties:', properties)
	.merge('units:', units)
	.merge('leases:', leases)
	.merge('charts:', charts)
	.merge('expenses:', expenses)
	.merge('transactions:', transactions);
