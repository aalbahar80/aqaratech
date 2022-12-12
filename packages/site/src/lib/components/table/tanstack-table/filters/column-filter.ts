import type { Filter } from '$lib/models/interfaces/filter.interface';

import type { Table } from '@tanstack/svelte-table';

const getColumns = <T>(table: Table<T>): Filter['options'] =>
	table.getAllLeafColumns().map((c) => ({
		// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
		label: c.columnDef.header?.toString() || c.id,
		value: c.id,
		active: c.getIsVisible(),
		action: c.getToggleVisibilityHandler(),
	}));

const getToggleAll = <T>(table: Table<T>): Filter['options'][number] => ({
	label: 'Toggle All',
	value: 'toggle-all',
	active: table.getIsAllColumnsVisible(),
	action: (e: unknown) => table.getToggleAllColumnsVisibilityHandler()(e),
});

export const getColumnFilter = <T>(table: Table<T>): Filter => ({
	id: 'columns',
	label: 'Columns',
	options: [getToggleAll(table), ...getColumns(table)],
});
