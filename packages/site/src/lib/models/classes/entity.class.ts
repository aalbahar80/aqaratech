import type { SelectedOption } from '$lib/models/interfaces/option.interface';

export abstract class Entity {
	// abstract schema: T;
	// abstract default: () => z.input<typeof this.schema>;
	// abstract basicFields: readonly string[];
	abstract getLabel: () => string;
	abstract data?: { id?: string };
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

	toOptions = (instances: this[]): Option[] => {
		return instances.map(this.toOption);
	};
	static getRelationOptions = (): RelationOptions => ({
		client: undefined,
		property: undefined,
		unit: undefined,
		tenant: undefined,
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
}
