<script lang="ts">
	import type {
		SelectedOption,
		Option,
	} from '$lib/models/interfaces/common/option.interface';
	import RadioEntity from './RadioEntity.svelte';
	import SelectEntity from './SelectEntity.svelte';

	type Field = 'clientId' | 'propertyId' | 'unitId';

	// Ensure parent is aware of generic type emitted from RadioEntity
	type $$Events = RadioEntity<Field>['$$events_def'];

	// # Begin select config #
	let client: SelectedOption;
	let property: SelectedOption;
	let unit: SelectedOption;
	// # End select config #

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
	// clear when options change
	let radio: RadioEntity<Field>;
	$: {
		if (radio && radioOptions) radio.clear();
	}
	// # End radio config #
</script>

<SelectEntity
	field="clientId"
	bind:selected={client}
	on:select={(e) => {
		propertySelect.clear();
		propertySelect.getOptions(e.detail);
	}}
/>
<SelectEntity
	bind:this={propertySelect}
	field="propertyId"
	initialParent={client?.value ?? undefined}
	bind:selected={property}
	disabled={!client?.value}
	on:select={(e) => {
		unitSelect.clear();
		unitSelect.getOptions(e.detail);
	}}
/>
<SelectEntity
	bind:this={unitSelect}
	field="unitId"
	bind:selected={unit}
	initialParent={property?.value ?? undefined}
	disabled={!property?.value || !client?.value}
/>

<RadioEntity bind:this={radio} options={radioOptions} on:select />
