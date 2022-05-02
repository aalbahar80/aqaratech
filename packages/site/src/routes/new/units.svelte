<script context="module" lang="ts">
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import FormUnit from '$lib/components/form/FormUnit.svelte';
	import { Unit } from '../../lib/models/classes/unit.class';
	import type { Load } from './[entity]';

	export const load: Load = async ({ url }) => {
		const predefined = Object.fromEntries(url.searchParams.entries());
		if (
			'propertyId' in predefined &&
			typeof predefined['propertyId'] === 'string'
		) {
			const property = await trpc.query(
				'properties:basic',
				predefined.propertyId,
			);
			return {
				props: { property },
			};
		}
		return {};
	};
</script>

<script lang="ts">
	export let property: InferQueryOutput<'properties:basic'> | undefined;
	const data = {
		...Unit.defaultForm(),
		...(property && { property: property.id }),
	};
</script>

<FormUnit {data} />
