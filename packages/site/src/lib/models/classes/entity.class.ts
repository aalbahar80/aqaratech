import type { Api } from '$lib/client/api';
import type { Field } from '$lib/models/classes/Field.class';
import type {
	Option,
	RelationOptions,
} from '$lib/models/interfaces/option.interface';
import type { User } from '$lib/models/types/auth.type';
import type { EntityTitle } from '$lib/models/types/entity.type';

export interface CreateForm<T> {
	api: Api;
	values: T;
	user: User;
}
export interface UpdateForm<T> extends CreateForm<T> {
	id: string;
}
export interface SubmittedForm<T> {
	redirectTo: string;
	data: T;
}

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

	abstract create: (info: CreateForm<any>) => Promise<SubmittedForm<any>>;
	abstract update: (info: UpdateForm<any>) => Promise<SubmittedForm<any>>;
}
