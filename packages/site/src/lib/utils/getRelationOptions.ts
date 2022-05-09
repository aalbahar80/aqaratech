import {
	Client,
	Property,
	Unit,
	type Expense,
	type MaintenanceOrder,
} from '$lib/models/classes';
import type { RelationOptions } from '$lib/models/interfaces/option.interface';

export const parseRelationOptions = (
	data: MaintenanceOrder['data'] | Expense['data'],
) => {
	const options: RelationOptions = {
		client: undefined,
		property: undefined,
		unit: undefined,
		tenant: undefined,
		lease: undefined,
	};
	let attribution: string | undefined;
	if (!data) return { options, attribution };
	if ('unit' in data && data.unit) {
		attribution = data.unit?.id;
		options.unit = new Unit(data.unit).toOption();
		options.property = new Property(data.unit.property).toOption();
		options.client = new Client(data.unit.property.client).toOption();
	} else if ('property' in data && data.property) {
		attribution = data.property?.id;
		options.property = new Property(data.property).toOption();
		options.client = new Client(data.property.client).toOption();
	} else if ('client' in data && data.client) {
		attribution = data.client?.id;
		options.client = new Client(data.client).toOption();
	}
	return {
		options,
		attribution,
	};
};
