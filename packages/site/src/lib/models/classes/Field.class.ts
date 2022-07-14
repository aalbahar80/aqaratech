import type { Option } from '$lib/models/interfaces/option.interface';
import { startCase } from '$lib/utils/common.js';

type FieldType =
	| 'text'
	| 'email'
	| 'number'
	| 'date'
	| 'datetime-local'
	| 'select'
	| 'checkbox'
	| 'radio';

export class Field {
	type: FieldType = 'text';
	private _label = '';
	valid = true;
	errorMessage: string | undefined = '';
	warnMessage: string | undefined = '';
	hint = '';
	required = false; // TODO: derive from zod schema
	disabled = false;
	private _value: any;

	public get value(): any {
		if (this.type === 'number' && this._value === undefined) {
			// <input type="number"> prints a warning if value is undefined
			return null;
		}
		return this._value;
	}

	public set value(value: any) {
		this._value = value;
	}

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

export class SelectField extends Field {
	override type = 'select' as const;
	options: Option[] = [];
	combobox = false;
	/**
	 * If true, the value of this field will be passed to Felte's `initialValues` argument.
	 *
	 * Otherwise, this field will not be initialized in felte's store
	 * unless it's input directly edited by the user.
	 * This is because Felte normally used the `name` of the input element to initialize the field,
	 * which we are not using for listboxes/comboxes.
	 *
	 * Unless this field is disabled, this should probably be set to true.
	 *
	 * Note to self: consider automatically setting to true based on `super.disabled`.
	 */
	autoInit = false;
	constructor(name: string, data?: Partial<SelectField>) {
		super(name, data);
		Object.assign(this, data);
	}
}
