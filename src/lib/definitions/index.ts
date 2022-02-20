import client from './client';
import property from './property';
import unit from './unit';
import lease from './lease';
import tenant from './tenant';
import transaction from './transaction';

export type EntityDefinitions = {
	defaultForm: any;
};

export default {
	clients: client,
	properties: property,
	units: unit,
	leases: lease,
	tenants: tenant,
	transactions: transaction,
};
