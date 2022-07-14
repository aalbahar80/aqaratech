<script lang="ts">
	import { page } from '$app/stores';
	import Form from '$lib/components/form/Form.svelte';
	import { Field } from '$lib/models/classes/Field.class';
	import type { PredefinedInvoice } from '$lib/models/interfaces/predefined.interface';
	import { toDateInput } from '$lib/utils/common';
	import {
		createSchema,
		updateSchema,
	} from '$models/schemas/transaction.schema.js';
	import type { LeaseInvoiceDto } from '@self/sdk';

	type TPredefinedInvoice = $$Generic<PredefinedInvoice | undefined>;

	type TLeaseInvoiceDto = $$Generic<
		TPredefinedInvoice extends undefined ? LeaseInvoiceDto : undefined
	>;

	interface Props {
		formType: 'create' | 'update';
	}

	interface UpdateForm extends Props {
		formType: 'update';
		data: TLeaseInvoiceDto;
	}

	interface CreateForm extends Props {
		formType: 'create';
		predefined: TPredefinedInvoice;
	}

	type $$Props = CreateForm | UpdateForm;

	export let formType: $$Props['formType'];
	export let data: TLeaseInvoiceDto = undefined as TLeaseInvoiceDto;
	export let predefined: TPredefinedInvoice = undefined as TPredefinedInvoice;

	const basicFields = [
		new Field('leaseId', {
			value: data?.leaseId || predefined?.leaseId,
			disabled: true,
			autoInit: true,
		}),
		new Field('amount', {
			type: 'number',
			required: true,
			value: data?.amount,
			label: 'Amount (KWD)',
		}),
		new Field('postAt', {
			type: 'date',
			required: true,
			value: toDateInput(data?.postAt),
			label: 'Post Date',
			hint: "Note that a transaction cannot be paid before it's post date.\n\nتاريخ الاستحقاق",
		}),
		new Field('dueAt', {
			type: 'date',
			value: toDateInput(data?.dueAt),
			label: 'Due Date',
			hint: 'If a due date is set, the transaction will be marked as "Past Due" after the due date. If a due date is not set, the transaction will only be marked as "Due" after it\'s post date.',
		}),
		new Field('isPaid', {
			type: 'checkbox',
			value: data?.isPaid ?? false,
			autoInit: true,
			label: 'Paid',
		}),
		new Field('paidAt', {
			type: 'date',
			value: toDateInput(data?.paidAt),
			label: 'Payment Date',
			hint: 'When was this transaction paid?\n\nتاريخ الدفع',
		}),
		new Field('memo', {
			value: data?.memo,
			hint: 'Enter a short description of the transaction. This will be visible to the tenant user.',
		}),
	];
</script>

<Form
	schema={formType === 'create' ? createSchema : updateSchema}
	entityTitle="leaseInvoices"
	{formType}
	{basicFields}
	onCreate={(values) =>
		$page.stuff.api.leaseInvoices.create({ createLeaseInvoiceDto: values })}
	onUpdate={(values) =>
		$page.stuff.api.leaseInvoices.update({
			id: data.id,
			updateLeaseInvoiceDto: values,
		})}
/>
