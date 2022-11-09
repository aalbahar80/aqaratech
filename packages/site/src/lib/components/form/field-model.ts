// create a form-field model to handle the field's state

import { writable } from 'svelte/store';

export interface FieldModel<T> {
	value: T;
	errors: string[];
	warnings: string[];
	valid: boolean;
}

export function createFieldModel<T>(initialValue: T): FieldModel<T> {
	const { subscribe, set, update } = writable(initialValue);

	return {
		subscribe,
		set,
		update,
	};
}
