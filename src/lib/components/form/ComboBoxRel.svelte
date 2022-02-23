<script lang="ts">
	import trpc from '$lib/client/trpc';
	import { entityDefinitions, type Entity } from '$lib/definitions';
	import Select from 'svelte-select';

	export let entity: Extract<Entity, 'tenants' | 'units' | 'properties'>;
	export let name: string;

	// look into value
	let value: string | null = 'abc123';
	export let optionLabel: null | { [key: string]: string };
	export let invalid: boolean;
	export let invalidText: string | undefined;

	const getLabel = (item: any) => {
		// console.log({ item }, 'ComboBoxRel.svelte ~ 16');
		const { label } = entityDefinitions[entity];
		// console.log({ label }, 'ComboBoxRel.svelte ~ 17');
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
	console.log(optionLabel);
	console.log({ id: value, label: getLabel(optionLabel) });
</script>

<div>
	<Select
		{loadOptions}
		optionIdentifier="id"
		value={{ id: value, label: getLabel(optionLabel) }}
		getSelectionLabel={getLabel}
		placeholder="Select a value"
	/>
</div>
