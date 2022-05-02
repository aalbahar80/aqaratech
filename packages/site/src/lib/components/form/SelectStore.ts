import { reject } from 'remeda';
import type { Option } from '$lib/models/interfaces/common/option.interface';
import { writable } from 'svelte/store';
import type { Client } from '../../models/classes/client.class';
import type { Property } from '../../models/classes/property.class';
import type { Unit } from '../../models/classes/unit.class';
import type { Lease } from '../../models/classes/lease.class';
import type { Tenant } from '../../models/classes/tenant.class';

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
			const result = await cstor.getList(parentId);
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
