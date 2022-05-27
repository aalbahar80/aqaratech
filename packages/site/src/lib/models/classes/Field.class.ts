import { startCase } from '$lib/utils/common';

type FeildType =
	| 'text'
	| 'email'
	| 'number'
	| 'date'
	| 'datetime-local'
	| 'select'
	| 'checkbox'
	| 'radio';

export class Field {
	type: FeildType = 'text';
	private _label = '';
	valid = true;
	errorMessage: string | undefined = '';
	value: any;
	hint = '';
	required = false; // TODO: derive from zod schema

	constructor(public name: string, data?: Partial<Field>) {
		Object.assign(this, data);
	}

	public get label(): string {
		return this._label || startCase(this.name);
	}

	public set label(value: string) {
		this._label = value;
	}
}
