<script lang="ts">
	import type {
		SelectedOption,
		Option,
	} from '$lib/models/interfaces/common/option.interface';
	import RadioEntity from './RadioEntity.svelte';
	import SelectEntity from './SelectEntity.svelte';
	import { ClientModel, PropertyModel, UnitModel } from '$models/interfaces';

	export let invalid = false;
	export let invalidText: string | undefined = undefined;

	type Field = 'clientId' | 'propertyId' | 'unitId';

	// Ensure parent is aware of generic type emitted from RadioEntity
	type $$Events = RadioEntity<Field>['$$events_def'];

	interface Predefined {
		client?: {
			id: string;
			firstName: string;
			lastName: string;
		};
		property?: {
			id: string;
			area: string | null;
			block: string | null;
			street: string | null;
			number: string | null;
		};
		unit?: {
			id: string;
			type: string | null;
			unitNumber: string;
		};
	}
	export let data: Predefined | undefined = undefined;

	// # Begin select config #
	let client: SelectedOption;
	let property: SelectedOption;
	let unit: SelectedOption;
	// # End select config #

	if (data) {
		client = data.client
			? {
					value: data.client.id,
					label: ClientModel.getLabel(data.client),
			  }
			: undefined;
		property = data.property
			? {
					value: data.property.id,
					label: PropertyModel.getLabel(data.property),
			  }
			: undefined;
		unit = data.unit
			? {
					value: data.unit.id,
					label: UnitModel.getLabel(data.unit),
			  }
			: undefined;
	}

	// # Begin radio config #
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

	let propertySelect: SelectEntity;
	let unitSelect: SelectEntity;

	let radio: RadioEntity<Field>;
</script>

<SelectEntity
	field="clientId"
	selected={client}
	on:select={(e) => {
		radio.clear();
		client = e.detail;
		propertySelect.clear();
		propertySelect.getOptions(client.value);
	}}
/>
<SelectEntity
	bind:this={propertySelect}
	field="propertyId"
	initialParent={client?.value ?? undefined}
	selected={property}
	disabled={!client?.value}
	on:select={(e) => {
		radio.clear();
		property = e.detail;
		unitSelect.clear();
		unitSelect.getOptions(property.value);
	}}
/>
<SelectEntity
	bind:this={unitSelect}
	field="unitId"
	selected={unit}
	initialParent={property?.value ?? undefined}
	disabled={!property?.value || !client?.value}
	on:select={(e) => {
		radio.clear();
		unit = e.detail;
	}}
/>

<RadioEntity
	bind:this={radio}
	options={radioOptions}
	on:select
	{invalid}
	{invalidText}
/>
