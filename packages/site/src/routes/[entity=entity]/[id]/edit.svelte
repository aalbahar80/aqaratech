<script context="module" lang="ts">
	import { page } from '$app/stores';
	import Form from '$components/form/Form.svelte';
	import { classMap } from '$lib/models/classes/all.class';
	import type { EntityTitle } from '$lib/models/types/entity.type';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({
		params,
		stuff,
	}: LoadEvent<{ id: string; entity: EntityTitle }>) => {
		const data = await stuff.api![params.entity].findOne({ id: params.id });
		return { props: { data } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let data: Prop['data'];
	const entityName = $page.params.entity as EntityTitle;
	const entity = new classMap[entityName](data);
</script>

<Form {entity} />
