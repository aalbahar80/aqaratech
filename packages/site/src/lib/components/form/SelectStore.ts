import type { Option } from '$lib/models/interfaces/common/option.interface';
import { writable } from 'svelte/store';
import type { Client } from '../../models/classes/client.class';
import type { Property } from '../../models/classes/property.class';
import type { Unit } from '../../models/classes/unit.class';

type EntityConstructor = typeof Client | typeof Property | typeof Unit;
export const createMyCustomStore = <T extends EntityConstructor>(cstor: T) => {
	const { subscribe, set } = writable<Option[]>([]);

	return {
		subscribe,
		fetchData: async (parentId?: string) => {
			console.log({ parentId }, 'SelectStore.ts ~ 14');
			const result = await cstor.getList(parentId);
			const options = result.map((i) => i.toOption());
			set(options);
		},
	};
};
