<script lang="ts" context="module">
	import { api } from '$lib/client/api';
	import PropertyPage from '$lib/components/property/PropertyPage.svelte';
	import UnitPage from '$lib/components/unit/UnitPage.svelte';
	import type { EntityTitle } from '$lib/models/types/entity.type';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({
		fetch,
		params,
	}: LoadEvent<{ id: string; entity: EntityTitle }>) => {
		const data = await api(fetch)[params.entity].findOne({
			id: params.id,
		});

		return { props: { data, entity: params.entity } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let data: Prop['data'];
	export let entity: Prop['entity'];

	const components = [
		{ component: PropertyPage, entity: 'properties' },
		{ component: UnitPage, entity: 'units' },
	];

	$: component = components.find(
		(option) => option.entity === entity,
	)?.component;
</script>

{#if component}
	<svelte:component this={component} {data} />
{/if}
