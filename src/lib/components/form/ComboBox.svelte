<script lang="ts">
	import trpc from '$lib/client/trpc';
	import { entityDefinitions, singular, type Entity } from '$lib/definitions';
	import startCase from 'lodash-es/startCase.js';
	import { createEventDispatcher, onMount } from 'svelte';
	import Select from 'svelte-select';

	type Option = { id: string; label: string };

	const dispatch = createEventDispatcher();
	export let entity: Extract<Entity, 'tenants' | 'units' | 'properties'>;
	export let invalidText: string = '';

	// default selected object
	export let optionLabel: null | { [key: string]: string };

	// id of the default selected option
	export let value: string | null;

	const getLabel = (item: any) => {
		const { label } = entityDefinitions[entity];
		if (label && item) return label(item);
		return '';
	};

	const loadOptions = (query?: string) =>
		trpc.query(`${entity}:search`, query).then((items) =>
			items.map((item) => ({
				id: item.id,
				label: getLabel(item),
			})),
		);

	// default dropdown options
	let items: Option[];

	onMount(async () => {
		// this creates the field in Felte's data store
		dispatch('select', {
			id: value,
			label: getLabel(optionLabel),
		});
		items = await loadOptions();
	});
</script>

<div class="">
	<label
		for={`${entity}Selector`}
		class="block text-sm font-medium text-gray-700"
	>
		{startCase(singular[entity])}</label
	>
	<Select
		id={`${entity}Selector`}
		{loadOptions}
		{items}
		optionIdentifier="id"
		placeholder="Type to search..."
		value={value ? { id: value, label: getLabel(optionLabel) } : null}
		hasError={Boolean(invalidText)}
		on:select
		on:clear
	/>
	{invalidText ?? ''}
</div>
