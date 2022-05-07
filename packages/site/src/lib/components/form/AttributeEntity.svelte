<script lang="ts">
	import type {
		Option,
		SelectedOption,
	} from '$lib/models/interfaces/option.interface';
	import RadioEntity from './RadioEntity.svelte';
	import SelectEntity from './SelectEntity.svelte';

	export let invalid = false;
	export let invalidText: string = '';

	export let client: SelectedOption = undefined;
	export let property: SelectedOption = undefined;
	export let unit: SelectedOption = undefined;
	export let initial: string | undefined = undefined;

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

	// Ensure parent is aware of generic type emitted from RadioEntity
	type $$Events = RadioEntity<Field>['$$events_def'];
	$: console.log({ client }, 'AttributeEntity.svelte ~ 48');
</script>

<SelectEntity
	field="clientId"
	selected={client}
	{invalid}
	{invalidText}
	on:select={(e) => {
		client = e.detail;
		property = undefined;
		unit = undefined;
		radio.clear();
	}}
/>

<SelectEntity
	field="propertyId"
	selected={property}
	parent={client}
	{invalid}
	{invalidText}
	on:select={(e) => {
		property = e.detail;
		unit = undefined;
		radio.clear();
	}}
/>

<SelectEntity
	field="unitId"
	selected={unit}
	parent={property}
	{invalid}
	{invalidText}
	on:select={(e) => {
		unit = e.detail;
		radio.clear();
	}}
/>

<RadioEntity
	bind:this={radio}
	options={radioOptions}
	{initial}
	on:select
	{invalid}
	{invalidText}
/>
