import { get } from 'svelte/store';

import type { Table } from '@tanstack/svelte-table';

import L from '$i18n/i18n-svelte';
import {
	FILTER_TYPE,
	type Filter,
} from '$lib/models/interfaces/filter.interface';

const getColumns = <T>(table: Table<T>): Filter['options'] =>
	table.getAllLeafColumns().map((c) => ({
		// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
		label: c.columnDef.header?.toString() || c.id,
		value: c.id,
		active: c.getIsVisible(),
		action: c.getToggleVisibilityHandler(),
	}));

const getToggleAll = <T>(table: Table<T>): Filter['options'][number] => ({
	label: get(L).buttons.toggleAll(),
	value: 'toggle-all',
	active: table.getIsAllColumnsVisible(),
	action: (e: unknown) => table.getToggleAllColumnsVisibilityHandler()(e),
});

export const getColumnFilter = <T>(table: Table<T>): Filter => ({
	id: 'columns',
	label: get(L).general.columns(),
	type: FILTER_TYPE.CHECKBOX,
	options: [getToggleAll(table), ...getColumns(table)],
});
