import type { Api } from '$lib/client/api';
import type { Option } from '$lib/models/interfaces/option.interface';
import { reject } from 'remeda';
import { writable } from 'svelte/store';
import type { Lease } from '../../models/classes/lease.class';
import type { Portfolio } from '../../models/classes/portfolio.class';
import type { Property } from '../../models/classes/property.class';
import type { Tenant } from '../../models/classes/tenant.class';
import type { Unit } from '../../models/classes/unit.class';

type EntityConstructor =
	| typeof Portfolio
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
		fetchData: async (api: Api, parentId?: string | null) => {
			let result: InstanceType<EntityConstructor>[] = [];
			try {
				let data;
				if (
					parentId &&
					(cstor.urlName === 'units' || cstor.urlName === 'properties')
				) {
					data = await cstor.getByParent(parentId, api);
				} else {
					data = await api[cstor.urlName].findAll();
				}
				result = data.results.map((data) => new cstor(data));
			} catch (e) {
				console.warn({ e }, 'SelectStore.ts ~ 29');
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
