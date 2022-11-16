import type { Option } from '$lib/models/interfaces/option.interface';

export interface ExpenseCategoryContext {
	data: Option[];
}

export const key = Symbol();
