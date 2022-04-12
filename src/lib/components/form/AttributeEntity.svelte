<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import RadioEntity from './RadioEntity.svelte';
	import SelectEntity from './SelectEntity.svelte';

	type Field = 'clientId' | 'propertyId' | 'unitId';
	type Value = string | null;

	let clientId: Value = '';
	let propertyId: Value = '';
	let unitId: Value = '';

	$: radioOptions = [
		{ value: clientId, title: 'Client' },
		{ value: propertyId, title: 'Property' },
		{ value: unitId, title: 'Unit' },
	];
	$: console.log({ radioOptions }, 'AttributeEntity.svelte ~ 18');

	const dispatch = createEventDispatcher<{
		select: [Field, Value][];
	}>();
	console.log({ clientId }, 'AttributeEntity.svelte ~ 22');
</script>

<SelectEntity
	field="clientId"
	bind:current={clientId}
	placeholder="Choose a client"
/>
<SelectEntity
	field="propertyId"
	parentId={clientId}
	bind:current={propertyId}
	disabled={!clientId}
	placeholder="Choose a property"
/>
<SelectEntity
	field="unitId"
	bind:current={unitId}
	parentId={propertyId}
	disabled={!propertyId || !clientId}
	placeholder="Choose a unit"
/>

<RadioEntity options={radioOptions} />

<!-- <button on:click|preventDefault={() => dispatch('select', [])}> -->
<button
	on:click|preventDefault={() => {
		console.log('ds');
		dispatch('select', [
			['clientId', clientId],
			['propertyId', propertyId],
			['unitId', unitId],
		]);
	}}
>
	<span>Clear</span>
</button>
