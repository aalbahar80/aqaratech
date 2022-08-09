<script lang="ts">
	import { page } from '$app/stores';
	import Form from '$lib/components/form/Form.svelte';
	import { Field } from '$lib/models/classes/Field.class';
	import type { PredefinedFile } from '$lib/models/interfaces/predefined.interface';
	import { createSchema } from '$models/schemas/lease-invoice.schema';

	export let predefined: PredefinedFile;

	const basicFields = [
		new Field('tenantId', {
			value: predefined?.tenantId,
			disabled: true,
			autoInit: true,
		}),
		new Field('portfolioId', {
			value: predefined?.portfolioId,
			disabled: true,
			autoInit: true,
		}),
		new Field('propertyId', {
			value: predefined?.propertyId,
			disabled: true,
			autoInit: true,
		}),
		new Field('unitId', {
			value: predefined?.unitId,
			disabled: true,
			autoInit: true,
		}),
		new Field('expenseId', {
			value: predefined?.expenseId,
			disabled: true,
			autoInit: true,
		}),
		new Field('leaseId', {
			value: predefined?.leaseId,
			disabled: true,
			autoInit: true,
		}),
		new Field('leaseInvoiceId', {
			value: predefined?.leaseInvoiceId,
			disabled: true,
			autoInit: true,
		}),
		new Field('maintenanceOrderId', {
			value: predefined?.maintenanceOrderId,
			disabled: true,
			autoInit: true,
		}),
		new Field('fileName', {
			value: '',
		}),
		new Field('label', {
			value: '',
		}),
	];
</script>

<Form
	schema={createSchema}
	entityTitle="files"
	formType="create"
	{basicFields}
	onSubmit={(values) => $page.stuff.api.files.create(values)}
/>
