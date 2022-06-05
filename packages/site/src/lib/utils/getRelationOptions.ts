import type { Expense, MaintenanceOrder } from '$lib/models/classes';
import { Portfolio } from '$lib/models/classes/portfolio.class.js';
import { Property } from '$lib/models/classes/property.class.js';
import { Unit } from '$lib/models/classes/unit.class.js';
import type { RelationOptions } from '$lib/models/interfaces/option.interface';

export const parseRelationOptions = (
	data: MaintenanceOrder['data'] | Expense['data'],
) => {
	const options: RelationOptions = {
		portfolio: undefined,
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
		options.portfolio = new Portfolio(data.unit.property.portfolio).toOption();
	} else if ('property' in data && data.property) {
		attribution = data.property?.id;
		options.property = new Property(data.property).toOption();
		options.portfolio = new Portfolio(data.property.portfolio).toOption();
	} else if ('portfolio' in data && data.portfolio) {
		attribution = data.portfolio?.id;
		options.portfolio = new Portfolio(data.portfolio).toOption();
	}
	return {
		options,
		attribution,
	};
};
