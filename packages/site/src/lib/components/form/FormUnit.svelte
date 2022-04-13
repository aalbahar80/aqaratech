<script lang="ts">
	import Form from '$components/form/Form.svelte';
	import type { InferQueryOutput } from '$lib/client/trpc';
	import SelectEntity from '$lib/components/form/SelectEntity.svelte';
	import { PropertyModel } from '$lib/models/interfaces';
	import type { SelectedOption } from '$lib/models/interfaces/common/option.interface';
	import { getModel } from '$lib/models/interfaces/utils/get-model';

	export let property: InferQueryOutput<'properties:basic'> | undefined;

	const model = getModel('units');
	const defaultForm = model.defaultForm();
	const data = {
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
	<title>{`New ${model.singularCap}`}</title>
</svelte:head>

<Form {model} {data} let:setData>
	<SelectEntity
		field="clientId"
		selected={selectedClient}
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
		on:select={(e) => {
			setData('propertyId', e.detail);
		}}
	/>
</Form>
