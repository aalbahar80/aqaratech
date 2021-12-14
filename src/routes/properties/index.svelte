<script lang="ts">
	import TableGeneric from '$components/table/TableGeneric.svelte';
	import { PropertyListDocument } from '../../generated/graphql';
	import { DeletePropertyDocument } from '$generated/graphql';
	import { Field, FieldList } from '$components/form/Field';
	import * as yup from 'yup';
	import IndexGeneric from '$components/IndexGeneric.svelte';

	const fieldListOld = [
		{ name: 'id', title: 'ID', visibile: true },
		{ name: 'client_id', title: 'Client ID', visibile: true },
		{ name: 'area', title: 'Area', visibile: true },
		{ name: 'block', title: 'Block', visibile: true },
		{ name: 'street', title: 'St', visibile: true },
		{ name: 'avenue', title: 'Ave', visibile: true },
		{ name: 'number', title: 'number', visibile: true },
		{ name: 'coordinates', title: 'Coordinates', visibile: true }
	];
	const fieldList: FieldList = new FieldList([
		new Field({
			fieldName: 'id',
			title: 'ID',
			editable: false
		}),
		new Field({
			fieldName: 'area',
			title: 'Area'
		}),
		new Field({
			fieldName: 'block',
			title: 'Block',
			validation: yup
				.number()
				.required()
				.min(1)
				.max(13)
				.typeError('Must be a number')
		}),
		new Field({
			fieldName: 'street',
			title: 'St',
			validation: yup
				.string()
				.required()
				.min(1)
				.max(13)
				.typeError('Must be a string')
		}),
		new Field({
			fieldName: 'avenue',
			title: 'Ave',
			visibile: false
		}),
		new Field({
			fieldName: 'number',
			title: 'Number'
		})
	]);
</script>

<svelte:head>
	<title>Properties</title>
</svelte:head>

<IndexGeneric
	title="Properties"
	graphQlName="properties"
	{fieldList}
	listDoc={PropertyListDocument}
	deleteDoc={DeletePropertyDocument}
/>
