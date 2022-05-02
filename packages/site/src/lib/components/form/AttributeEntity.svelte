<script lang="ts">
	import type {
		Option,
		SelectedOption,
	} from '$lib/models/interfaces/common/option.interface';
	import RadioEntity from './RadioEntity.svelte';
	import SelectEntity from './SelectEntity.svelte';

	export let invalid = false;
	export let invalidText: string = '';

	let client: SelectedOption;
	let property: SelectedOption;
	let unit: SelectedOption;

	// # Begin radio config #
	type Field = 'clientId' | 'propertyId' | 'unitId';
	interface RadioOption extends Option {
		fieldName: Field;
		title: string;
	}
	let radioOptions: RadioOption[];
	$: radioOptions = [
		{
			value: client?.value,
			title: 'Client',
			label: client?.label,
			fieldName: 'clientId',
		},
		{
			value: property?.value,
			title: 'Property',
			label: property?.label,
			fieldName: 'propertyId',
		},
		{
			value: unit?.value,
			title: 'Unit',
			label: unit?.label,
			fieldName: 'unitId',
		},
	];

	let radio: RadioEntity<Field>;
</script>

<SelectEntity
	field="clientId"
	bind:selected={client}
	{invalid}
	{invalidText}
	on:select={() => {
		property = undefined;
		unit = undefined;
		radio.clear();
	}}
/>

<SelectEntity
	field="propertyId"
	bind:selected={property}
	parent={client}
	disabled={!client}
	{invalid}
	{invalidText}
	on:select={() => {
		unit = undefined;
		radio.clear();
	}}
/>

<SelectEntity
	field="unitId"
	bind:selected={unit}
	parent={property}
	disabled={!client || !property}
	{invalid}
	{invalidText}
	on:select={() => {
		radio.clear();
	}}
/>

<RadioEntity
	bind:this={radio}
	options={radioOptions}
	on:select
	{invalid}
	{invalidText}
/>
