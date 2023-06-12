import type { RowData } from '@tanstack/svelte-table';

declare module '@tanstack/svelte-table' {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface ColumnMeta<TData extends RowData, TValue> {
		cls?: string;
	}
}
