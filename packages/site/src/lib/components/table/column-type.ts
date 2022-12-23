import type { ColumnDef } from '@tanstack/svelte-table';

/**
 * A type that represents a union of the return types of the column helper functions
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ColumnDto<T> = ColumnDef<T, any>;
