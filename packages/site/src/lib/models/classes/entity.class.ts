import type { SelectedOption } from '$lib/models/interfaces/option.interface';
import type { EntityTitle } from '$lib/models/types/entity.type';

export abstract class Entity {
	// abstract schema: T;
	// abstract default: () => z.input<typeof this.schema>;
	// abstract basicFields: readonly string[];
	abstract urlName: EntityTitle;
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
		if (!this.data || !this.data.id) {
			console.warn('no id');
			return undefined;
			// throw new Error('no id');
		}
		return {
			value: this.data.id,
			label: this.getLabel(),
		};
	};

	toOptions = (instances: this[]): (Option | undefined)[] => {
		return instances.map(this.toOption);
	};
	
	relationalFields: readonly string[] = [];

	// Change data type to this.data?
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getRelationOptions = (data: any = undefined): RelationOptions => ({
		client: undefined,
		property: undefined,
		unit: undefined,
		tenant: undefined,
		lease: undefined,
	});
}

interface Option {
	label: string;
	value: string;
}

interface RelationOptions {
	client?: SelectedOption;
	property?: SelectedOption;
	unit?: SelectedOption;
	tenant?: SelectedOption;
	lease?: SelectedOption;
}
