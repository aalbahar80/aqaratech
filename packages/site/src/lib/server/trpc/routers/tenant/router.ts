import { createRouter } from './createRouter';
import { transactions } from './transactions';

export const tenantRouter = createRouter().merge('transactions:', transactions);
