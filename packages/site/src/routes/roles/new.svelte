<script context="module" lang="ts">
	import RoleForm from '$lib/components/role/RoleForm.svelte';
	import type { PredefinedRole } from '$lib/models/interfaces/predefined.interface';
	import { entitiesMap, isEntity } from '@self/utils';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ url }: LoadEvent) => {
		// Check correct url params are present
		const entity = url.searchParams.get('entity');
		const entityId = url.searchParams.get('entityId');

		if (!isEntity(entity) || !entityId) {
			throw new Error('No predefined role in url');
		}

		let roleType: PredefinedRole['roleType'] | undefined = undefined;
		if (entity === 'organization') {
			roleType = 'ORGADMIN';
		} else if (entity === 'portfolio') {
			roleType = 'PORTFOLIO';
		} else if (entity === 'tenant') {
			roleType = 'TENANT';
		} else {
			throw new Error('Unknown entity type');
		}

		const idField = entitiesMap[entity].idField;

		if (!idField) {
			throw new Error('Unable to get idField');
		}

		let predefined: PredefinedRole = { entity, entityId, idField, roleType };

		return { props: { predefined } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let predefined: Prop['predefined'];
</script>

<RoleForm {predefined} />
