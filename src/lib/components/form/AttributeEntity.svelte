<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import RadioEntity from './RadioEntity.svelte';
	import SelectEntity from './SelectEntity.svelte';

	type Field = 'clientId' | 'propertyId' | 'unitId';
	type Value = string | null;
	interface Option {
		value: string | null;
		label: string;
	}
	type SelectedOption = Option | undefined;
	let client: SelectedOption;
	let property: SelectedOption;
	let unit: SelectedOption;

	$: radioOptions = [
		{ value: client?.value, title: 'Client', description: client?.label },
		{ value: property?.value, title: 'Property', description: property?.label },
		{ value: unit?.value, title: 'Unit', description: unit?.label },
	];
	$: console.log({ radioOptions }, 'AttributeEntity.svelte ~ 18');

	const dispatch = createEventDispatcher<{
		select: [Field, string][];
	}>();
</script>

<SelectEntity
	field="clientId"
	bind:current={client}
	placeholder="Choose a client"
/>
<SelectEntity
	field="propertyId"
	parent={client}
	bind:current={property}
	disabled={!client?.value}
	placeholder="Choose a property"
/>
<SelectEntity
	field="unitId"
	bind:current={unit}
	parent={property}
	disabled={!property?.value || !client?.value}
	placeholder="Choose a unit"
/>

<RadioEntity options={radioOptions} />

<!-- <button on:click|preventDefault={() => dispatch('select', [])}> -->
<!-- <button
	on:click|preventDefault={() => {
		console.log('ds');
		dispatch('select', [
			['clientId', clientId],
			['propertyId', propertyId],
			['unitId', unitId],
		]);
	}}
>
	<span>Clear</span>
</button> -->
