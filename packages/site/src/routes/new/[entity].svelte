<script context="module" lang="ts">
	import Form from '$components/form/Form.svelte';
	import { trpc } from '$lib/client/trpc';
	import type { EntityTitle, Relation } from '$lib/models/types/entity.type';
	import { z } from 'zod';
	import {
		classMap,
		relationalClassMap,
	} from '../../lib/models/classes/all.class';
	import type { Load } from './[entity]';

	export const load: Load = async ({ url, fetch, params }) => {
		const entityTitle = params.entity as EntityTitle;

		const searchParams = Object.fromEntries(url.searchParams.entries());
		const keys: Relation[] = ['clientId', 'propertyId', 'unitId', 'leaseId'];
		const key = keys.find((key) => key in searchParams);
		if (!key) return { props: { entityTitle } };

		const value = z.string().uuid().safeParse(searchParams[key]);
		if (!value.success) return { props: { entityTitle } };

		const cstor = relationalClassMap[key];
		const data = await trpc(fetch).query(`${cstor.urlName}:basic`, value.data);
		const predefined = {
			...searchParams,
			[cstor.singular]: data,
		};
		return {
			props: { predefined: { ...predefined }, entityTitle },
		};
	};
</script>

<script lang="ts">
	export let predefined: any;
	// export let predefined: RelationOptions | undefined;
	export let entityTitle: EntityTitle;

	const entity = new classMap[entityTitle](predefined);
	entity.data = { ...entity.defaultForm(), ...predefined };
</script>

<svelte:head>
	<title>{`New ${entity.singularCap}`}</title>
</svelte:head>

<Form {entity} />
