<script lang="ts">
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import Select from '$lib/components/Select.svelte';
	import type { Entity } from '$lib/definitions';
	import { concatIfExists } from '$lib/utils/table-utils';

	// export let entity: Extract<Entity, 'tenants' | 'units' | 'properties'>;
	// type E = typeof entity;
	type E = 'tenants' | 'units' | 'properties';
	export let entity: E;

	type EntityLabels = {
		units: (item: InferQueryOutput<`units:search`>[number]) => string;
		tenants: (item: InferQueryOutput<`tenants:search`>[number]) => string;
	};

	const labels: EntityLabels = {
		tenants: (item) => concatIfExists([item.firstName, item.lastName]),
		units: (item) => item.id,
	};

	const createLabel = (item: InferQueryOutput<`${E}:search`>[number]) => ({
		value: item.id,
		// label: entity === 'tenants' ? labels.tenants(item) : item.id,
		label: labels[entity](item),
	});

	export let value = '';
	export let invalid: boolean;
	export let invalidText: string | undefined;

	let name = 'tempName';
	let optionLabel = 'temmpdefault';
	// add debounce
	const getOptions = (entity: E, query: string) =>
		trpc.query(`${entity}:search`, query).then((items) =>
			items.map((item) => ({
				value: item.id,
				// label: entity === 'tenants' ? labels.tenants(item) : item.id,
				label: labels[entity](item),
			})),
		);
	const a = labels.tenants({ id: 'df', firstName: 'a', lastName: 'b' });
</script>

<Select {name} {value} label={optionLabel} error={invalidText} {getOptions} />
