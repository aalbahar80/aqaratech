<script lang="ts">
	import Form from '$components/form/Form.svelte';
	import SelectEntity from '$lib/components/form/SelectEntity.svelte';
	import { UnitModel } from '$lib/models/interfaces';
	import type { SelectedOption } from '$lib/models/interfaces/common/option.interface';
	import type { InferQueryOutput } from '../../client/trpc';
	import { Client } from '../../models/classes/client.class';
	import { Property } from '../../models/classes/property.class';
	import type { Unit } from '../../models/classes/unit.class';

	export let data:
		| InferQueryOutput<'units:read'>
		| ReturnType<typeof Unit.defaultForm>;

	let client: SelectedOption =
		'property' in data
			? {
					value: data.property.clientId,
					label: Client.getLabel(data.property.client),
			  }
			: undefined;

	let property: SelectedOption =
		'property' in data
			? {
					value: data.property.id,
					label: Property.getLabel(data.property),
			  }
			: undefined;
</script>

<svelte:head>
	<title>{data?.id ? 'Edit' : 'New'} Unit</title>
</svelte:head>

<Form model={UnitModel} {data} let:setData let:errors let:getValue>
	<SelectEntity
		field="clientId"
		bind:selected={client}
		invalid={!!getValue(errors, 'propertyId')}
		on:select={() => {
			property = undefined;
			setData('propertyId', null);
		}}
	/>

	<SelectEntity
		field="propertyId"
		bind:parent={client}
		bind:selected={property}
		invalid={!!getValue(errors, 'propertyId')}
		invalidText={getValue(errors, 'propertyId')?.[0]}
		on:select={(e) => {
			setData('propertyId', e.detail.value);
		}}
	/>
</Form>
