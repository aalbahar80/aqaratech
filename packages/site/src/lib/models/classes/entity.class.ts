import type { Field } from '$lib/models/classes/Field.class';
import type {
	Option,
	RelationOptions,
} from '$lib/models/interfaces/option.interface';
import type { EntityTitle } from '$lib/models/types/entity.type';

export abstract class Entity {
	abstract urlName: EntityTitle;
	abstract basicFields: Field[];
	abstract data?: { id?: string };

	getLabel = () => {
		if (this.data?.id) {
			return this.data.id;
		} else {
			console.warn('no id');
			return '';
		}
	};

	toOption = () => {
		return {
			value: this.data?.id,
			label: this.getLabel(),
		};
	};

	toOptions = (instances: this[]): Option[] => instances.map(this.toOption);

	relationalFields: readonly string[] = [];

	getRelationOptions = (): RelationOptions => ({
		portfolio: undefined,
		property: undefined,
		unit: undefined,
		tenant: undefined,
		lease: undefined,
	});
}
