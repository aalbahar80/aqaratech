<script lang="ts">
	import trpc from '$lib/client/trpc';
	import Select from '$lib/components/Select.svelte';
	import { entityDefinitions, type Entity } from '$lib/definitions';
	import ComboBox from './ComboBox.svelte';

	export let entity: Extract<Entity, 'tenants' | 'units' | 'properties'>;
	export let name: string;

	// look into value
	export let value: string | null;
	export let optionLabel: null | { [key: string]: string };
	console.log(optionLabel);
	export let invalid: boolean;
	export let invalidText: string | undefined;
	// add debounce
	const getLabel = (item: any) => {
		const label = entityDefinitions[entity].label;
		if (label && item) return label(item);
		return '';
	};

	const getOptions = (query?: string) =>
		trpc.query(`${entity}:search`, query).then((items) =>
			items.map((item) => ({
				value: item.id,
				label: getLabel(item),
			})),
		);
</script>

<!-- <Select
	{name}
	{value}
	optionLabel={getLabel(optionLabel)}
	error={invalidText}
	{getOptions}
/> -->

<!-- {value} -->
<ComboBox
	bind:value
	{name}
	optionLabel={getLabel(optionLabel)}
	error={invalidText}
	{getOptions}
	on:selection
/>
