<script lang="ts">
	import trpc from '$lib/client/trpc';
	import Select from '$lib/components/Select.svelte';
	import { entityDefinitions, type Entity } from '$lib/definitions';

	export let entity: Extract<Entity, 'tenants' | 'units' | 'properties'>;
	export let name: string;

	// look into value
	export let value: string | null = '';
	export let optionLabel: null | { [key: string]: string };
	console.log(optionLabel);
	export let invalid: boolean;
	export let invalidText: string | undefined;
	// add debounce
	const getLabel = (item: any) => {
		const label = entityDefinitions[entity].label;
		if (label) return label(item);
		return item.id;
	};

	const getOptions = (query?: string) =>
		trpc.query(`${entity}:search`, query).then((items) =>
			items.map((item) => ({
				value: item.id,
				label: getLabel(item),
			})),
		);
</script>

<Select
	{name}
	{value}
	optionLabel={getLabel(optionLabel)}
	error={invalidText}
	{getOptions}
/>
