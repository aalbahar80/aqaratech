<script lang="ts">
	import { FieldList, Field } from '$components/form/Field';

	import IndexGeneric from '$components/IndexGeneric.svelte';

	import { DeleteUnitDocument, UnitListDocument } from '$generated/graphql';

	const fieldList: FieldList = new FieldList([
		new Field({
			fieldName: 'id',
			title: 'ID',
			editable: false
		}),
		new Field({
			fieldName: 'is_vacant',
			title: 'Vacant?',
			editable: false
		}),
		new Field({
			fieldName: 'rent_market',
			title: 'Market Rent',
			inputType: 'number'
		}),
		new Field({
			fieldName: 'size',
			title: 'Size m²',
			inputType: 'number'
		}),
		new Field({
			fieldName: 'type',
			title: 'Type'
		}),
		new Field({
			fieldName: 'unit_number',
			title: 'Number'
		}),
		new Field({
			fieldName: 'usage',
			title: 'Usage'
		}),
		new Field({
			fieldName: 'bed',
			title: 'Beds',
			inputType: 'number'
		}),
		new Field({
			fieldName: 'bath',
			title: 'Baths',
			inputType: 'number'
		}),
		new Field({
			fieldName: 'floor',
			title: 'Floor',
			inputType: 'number'
		})
	]);
</script>

<svelte:head>
	<title>Units</title>
</svelte:head>

<IndexGeneric
	title="Units"
	graphQlName="units"
	{fieldList}
	listDoc={UnitListDocument}
	deleteDoc={DeleteUnitDocument}
/>
