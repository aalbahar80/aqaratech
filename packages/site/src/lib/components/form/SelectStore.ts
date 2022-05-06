import type { Option } from '$lib/models/interfaces/option.interface';
import { reject } from 'remeda';
import { writable } from 'svelte/store';
import type { Client } from '../../models/classes/client.class';
import type { Lease } from '../../models/classes/lease.class';
import type { Property } from '../../models/classes/property.class';
import type { Tenant } from '../../models/classes/tenant.class';
import type { Unit } from '../../models/classes/unit.class';

type EntityConstructor =
	| typeof Client
	| typeof Property
	| typeof Unit
	| typeof Tenant
	| typeof Lease;
export const createMyCustomStore = <T extends EntityConstructor>(
	cstor: T,
	initial: Option[],
) => {
	const { subscribe, set } = writable<Option[]>(initial);

	return {
		subscribe,
		fetchData: async (parentId?: string) => {
			let result;
			try {
				result = await cstor.getList(parentId);
			} catch (e) {
				console.error({ e }, 'SelectStore.ts ~ 29');
				result = [];
			}
			const options = result.map((i) => i.toOption());

			// is initial value in new options?
			const duplicated = options.some((i) => i.value === initial[0]?.value);
			if (duplicated) {
				const deduped = reject(options, (i) => i.value === initial[0]?.value);
				set([...initial, ...deduped]);
			} else {
				set(options);
			}
		},
	};
};
