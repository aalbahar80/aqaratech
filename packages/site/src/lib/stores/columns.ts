import { startCase } from '$lib/utils/common';
import compare from 'just-compare';
import { get, writable, type Writable } from 'svelte/store';

export type Head = {
	key: string;
	label: string;
	visible: boolean;
};

function isSameTable(a: Head[], b: Head[]) {
	const isIdentical = compare(
		a.map((head) => head.key),
		b.map((head) => head.key),
	);
	return isIdentical;
}

function deriveHeads(rows: any[]): Head[] {
	return Object.keys(rows[0]).map((key) => ({
		key,
		label: startCase(key),
		visible: true,
	}));
}

function createColumns() {
	const { subscribe, set, update } = <Writable<Head[]>>writable([]);

	return {
		subscribe,
		reset: () => set([]),
		newData: (rows: any[]) => {
			const heads = deriveHeads(rows);
			// if user has not changed the table
			// don't reset column visibility
			if (!isSameTable(heads, get(columns))) {
				set(heads);
			}
		},
		toggle: (key: string, visible: boolean) =>
			update((n) => n.map((h) => (h.key === key ? { ...h, visible } : h))),
	};
}

export const columns = createColumns();
