import { goto } from '$app/navigation';
import type { Fields } from '$lib/models/classes/Field.class';
import { getRoute, PageType, type Entity } from '@self/utils';
import * as R from 'remeda';
import { writable } from 'svelte/store';
import type { z } from 'zod';

// export type FormModel<S extends z.ZodTypeAny, T = z.infer<S>> = {
export interface FormModel<T> {
	schema: z.ZodType<T>;
	fields: T;
	errors: Partial<T>;
	submit: () => void;
	getBlankForm: () => Partial<T>;
	onSuccess: (data: unknown, params: Record<string, string>) => void;
}

export function createFormModel<T>({
	schema,
	entity,
	initialFields,
}: {
	schema: z.ZodType<T>;
	entity: Entity;
	initialFields?: Partial<T>;
	fields: Fields<T>;
}): FormModel<T> {
	const getBlankForm = () => {
		return initialFields ?? {};
	};

	const fields = writable(initialFields);

	const errors = writable({} as Partial<T>);

	const submit = () => {
		// TODO 2 implement submit
	};

	const onSuccess = ({
		value,
		params,
	}: {
		value: unknown;
		params: Record<string, string>;
	}): Promise<void> => {
		let id = '';

		if (typeof value === 'string') {
			id = value;
		} else if (
			R.isObject(value) &&
			'id' in value &&
			typeof value.id === 'string'
		) {
			id = value.id;
		}

		const url = getRoute({
			entity,
			id,
			pageType: PageType.Id,
			params,
		});

		return goto(url);
	};

	return {
		fields,
		errors,
		submit,
		schema,
		onSuccess,
		getBlankForm,
	};
}
