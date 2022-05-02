export abstract class Entity {
	// abstract schema: T;
	// abstract default: () => z.input<typeof this.schema>;
	// abstract basicFields: readonly string[];
	abstract getLabel: () => string;
	abstract data?: { id?: string };
	toOption = () => {
		if (!this.data || !this.data.id) {
			throw new Error('no id');
		}
		return {
			value: this.data.id,
			label: this.getLabel(),
		};
	};

	toOptions = (instances: this[]): Option[] => {
		return instances.map(this.toOption);
	};
}

interface Option {
	label: string;
	value: string;
}
