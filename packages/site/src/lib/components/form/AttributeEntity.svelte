<script lang="ts">
	import type {
		Option,
		SelectedOption,
	} from '$lib/models/interfaces/common/option.interface';
	import { Client } from '../../models/classes/client.class';
	import { Property } from '../../models/classes/property.class';
	import { Unit } from '../../models/classes/unit.class';
	import RadioEntity from './RadioEntity.svelte';
	import S2 from './S2.svelte';
	import { createMyCustomStore } from './SelectStore';

	export let invalid = false;
	export let invalidText: string = '';

	let client: SelectedOption;
	let property: SelectedOption;
	let unit: SelectedOption;

	let clientOptions = createMyCustomStore(Client);
	let propertyOptions = createMyCustomStore(Property);
	let unitOptions = createMyCustomStore(Unit);

	clientOptions.fetchData();
	$: propertyOptions.fetchData(client?.value);
	$: unitOptions.fetchData(property?.value);

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

<S2
	field="clientId"
	bind:selected={client}
	options={$clientOptions}
	{invalid}
	{invalidText}
	on:select={(e) => {
		property = undefined;
		unit = undefined;
		radio.clear();
	}}
/>

<S2
	field="propertyId"
	bind:selected={property}
	options={$propertyOptions}
	disabled={!client}
	{invalid}
	{invalidText}
	on:select={(e) => {
		unit = undefined;
		radio.clear();
	}}
/>

<S2
	field="unitId"
	bind:selected={unit}
	options={$unitOptions}
	disabled={!client || !property}
	{invalid}
	{invalidText}
	on:select={(e) => {
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
