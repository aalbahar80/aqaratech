<script lang="ts">
	import Form from '$components/form/Form.svelte';
	import SelectEntity from '$lib/components/form/SelectEntity.svelte';
	import type { SelectedOption } from '$lib/models/interfaces/option.interface';
	import type { InferQueryOutput } from '../../client/trpc';
	import { Client } from '../../models/classes/client.class';
	import { Property } from '../../models/classes/property.class';
	import { Unit } from '../../models/classes/unit.class';

	export let data:
		| InferQueryOutput<'units:read'>
		| ReturnType<typeof Unit.defaultForm>;

	let property: SelectedOption =
		'property' in data && data.property.id
			? new Property(data.property).toOption()
			: undefined;

	let client: SelectedOption =
		'property' in data && data.property.client?.id
			? new Client(data.property.client).toOption()
			: undefined;
</script>

<svelte:head>
	<title>{data?.id ? 'Edit' : 'New'} Unit</title>
</svelte:head>
<Form cstor={Unit} {data} let:setData let:errors let:getValue>
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
		bind:selected={property}
		parent={client}
		invalid={!!getValue(errors, 'propertyId')}
		invalidText={getValue(errors, 'propertyId')?.[0]}
		on:select={(e) => {
			setData('propertyId', e.detail.value);
		}}
	/>
</Form>
