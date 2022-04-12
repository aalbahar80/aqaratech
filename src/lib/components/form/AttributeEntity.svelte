<script lang="ts">
	import type {
		SelectedOption,
		Option,
	} from '$lib/models/interfaces/common/option.interface';
	import RadioEntity from './RadioEntity.svelte';
	import SelectEntity from './SelectEntity.svelte';

	type Field = 'clientId' | 'propertyId' | 'unitId';

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

	// clear when options change
	let radio: RadioEntity<Field>;
	$: {
		if (radio && radioOptions) radio.clear();
	}
	// # End radio config #
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

<RadioEntity options={radioOptions} bind:this={radio} on:select />
