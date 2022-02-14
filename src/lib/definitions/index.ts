import client from './client';
import property from './property';
import unit from './unit';
import tenant from './tenant';
import lease from './lease';
import transaction from './transaction';

export type EntityDefinitions = {
	defaultForm: any;
	formSchema?: any;
	transformer?: any;
	refiner?: any;
};

export default {
	client,
	property,
	unit,
	lease,
	tenant,
	transaction,
};
