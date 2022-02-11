import client from './client';
import property from './property';
import unit from './unit';
import tenant from './tenant';
import lease from './lease';

export type EntityDefinitions = {
	formSchema: any;
	defaultForm: any;
	transformer?: any;
};

export default {
	client,
	property,
	unit,
	lease,
	tenant,
};
