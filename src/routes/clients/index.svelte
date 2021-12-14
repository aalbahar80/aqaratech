<script lang="ts">
	import { Field, FieldList } from '$components/form/Field';
	import * as yup from 'yup';
	import { ClientListDocument, DeleteClientDocument } from '$generated/graphql';
	import IndexGeneric from '$components/IndexGeneric.svelte';

	const fieldList: FieldList = new FieldList([
		new Field({ fieldName: 'id', title: 'ID', editable: false }),
		new Field({
			fieldName: 'first_name',
			title: 'First Name',
			validation: yup.string().required()
		}),
		new Field({
			fieldName: 'last_name',
			title: 'Last Name',
			validation: yup.string().required()
		}),
		new Field({
			fieldName: 'email',
			title: 'Email',
			validation: yup.string().email()
		}),
		new Field({
			fieldName: 'phone',
			title: 'Phone',
			validation: yup.string().matches(/^[0-9]{8}$/, {
				message: 'Must be an 8 digit number',
				excludeEmptyString: true
			})
		})
	]);
</script>

<svelte:head>
	<title>Clients</title>
</svelte:head>

<IndexGeneric
	title="Clients"
	graphQlName="clients"
	{fieldList}
	listDoc={ClientListDocument}
	deleteDoc={DeleteClientDocument}
/>
