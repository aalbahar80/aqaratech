<script context="module" lang="ts">
	import RoleForm from '$lib/components/role/RoleForm.svelte';
	import { entityNameMap } from '$lib/constants/names';
	import type { PredefinedRole } from '$lib/models/interfaces/predefined.interface';
	import type { EntityTitle } from '$lib/models/types/entity.type';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ url }: LoadEvent) => {
		// Check correct url params are present
		const entity = url.searchParams.get('entity') as EntityTitle | null;
		const entityId = url.searchParams.get('entityId');

		let roleType: PredefinedRole['roleType'] | undefined = undefined;
		if (entity === 'organizations') {
			roleType = 'ORGADMIN';
		} else if (entity === 'portfolios') {
			roleType = 'PORTFOLIO';
		} else if (entity === 'tenants') {
			roleType = 'TENANT';
		}

		if (!entity || !entityId || !roleType) {
			throw new Error('No predefined role in url');
		}

		const idField = entityNameMap[entity]?.idField as string | undefined;

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
