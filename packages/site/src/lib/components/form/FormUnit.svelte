<script lang="ts">
	import Form from '$components/form/Form.svelte';
	import type { InferQueryOutput } from '$lib/client/trpc';
	import SelectEntity from '$lib/components/form/SelectEntity.svelte';
	import { PropertyModel, UnitModel } from '$lib/models/interfaces';
	import type { SelectedOption } from '$lib/models/interfaces/common/option.interface';

	export let property: InferQueryOutput<'properties:basic'> | undefined =
		undefined;
	export let unit: InferQueryOutput<'units:read'> | undefined = undefined;

	const model = UnitModel;
	const defaultForm = model.defaultForm();
	const data = unit
		? {
				...unit,
				propertyId: property?.id ?? null,
		  }
		: {
				...defaultForm,
				propertyId: property?.id ?? null,
		  };
	console.log(data);

	let selectedClient: SelectedOption = property?.client
		? {
				value: property.client.id,
				label: `${property.client.firstName} ${property.client.lastName}`,
		  }
		: undefined;

	let selectedProperty = property
		? {
				value: property.id,
				label: PropertyModel.getLabel(property),
		  }
		: undefined;

	let propertySelect: SelectEntity;
</script>

<svelte:head>
	<title>{unit ? 'Edit' : 'New'} Unit</title>
</svelte:head>

<Form {model} {data} let:setData let:errors let:getValue>
	<SelectEntity
		field="clientId"
		selected={selectedClient}
		invalid={!!getValue(errors, 'propertyId')}
		on:select={(e) => {
			propertySelect.clear();
			propertySelect.getOptions(e.detail);
		}}
	/>
	<SelectEntity
		bind:this={propertySelect}
		selected={selectedProperty}
		field="propertyId"
		initialParent={selectedClient?.value ?? undefined}
		invalid={!!getValue(errors, 'propertyId')}
		invalidText={getValue(errors, 'propertyId')?.[0]}
		on:select={(e) => {
			setData('propertyId', e.detail);
		}}
	/>
</Form>
