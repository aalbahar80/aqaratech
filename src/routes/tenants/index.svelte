<script lang="ts">
	import { Field, FieldList } from '$components/form/Field';
	import IndexGeneric from '$components/IndexGeneric.svelte';
	import {
		DeleteTenantDocument,
		InsertTenantDocument,
		TenantListDocument,
		UpdateTenantDocument
	} from '$generated/graphql';
	import * as yup from 'yup';

	const fieldList: FieldList = new FieldList([
		new Field({
			fieldName: 'id',
			title: 'ID',
			editable: false
		}),
		new Field({
			fieldName: 'first_name',
			title: 'First Name',
			inputType: 'text',
			validation: yup.string().required()
		}),
		new Field({
			fieldName: 'last_name',
			title: 'Last Name',
			inputType: 'text',
			validation: yup.string().required()
		}),
		new Field({
			fieldName: 'email',
			title: 'Email',
			inputType: 'email',
			validation: yup.string().nullable().email()
		}),
		new Field({
			fieldName: 'phone',
			title: 'Phone',
			inputType: 'tel',
			validation: yup
				.string()
				.nullable()
				.matches(/^[0-9]{8}$/, {
					message: 'Must be an 8 digit number',
					excludeEmptyString: true
				})
		})
	]);
</script>

<IndexGeneric
	title="Tenants"
	graphQlName="tenants"
	{fieldList}
	listDoc={TenantListDocument}
	insertDoc={InsertTenantDocument}
	updateDoc={UpdateTenantDocument}
	deleteDoc={DeleteTenantDocument}
/>
