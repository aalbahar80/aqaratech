<script lang="ts">
	import { page } from '$app/stores';
	import { api } from '$api';
	import Form from '$lib/components/form/Form.svelte';
	import { Field } from '$lib/models/classes/Field.class';
	import type { PredefinedInvoice } from '$lib/models/interfaces/predefined.interface';
	import {
		OrganizationIdField,
		PortfolioIdField,
	} from '$lib/utils/form/common-fields';
	import {
		createSchema,
		updateSchema,
		warnSchema,
	} from '$models/schemas/lease-invoice.schema';
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
		OrganizationIdField(
			data?.organizationId || $page.data.user?.role?.organizationId,
		),
		PortfolioIdField(data?.portfolioId || predefined?.portfolioId),
		new Field('leaseId', {
			value: data?.leaseId || predefined?.leaseId,
			disabled: true,
			autoInit: true,
			hidden: true,
		}),
		new Field('isPaid', {
			label: 'Paid',
			type: 'checkbox',
			value: data?.isPaid ?? false,
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
			value: data?.postAt.split('T')[0],
			label: 'Post Date',
			hint: "Note that a transaction cannot be paid before it's post date.\n\nتاريخ الاستحقاق",
		}),
		new Field('dueAt', {
			type: 'date',
			value: data?.dueAt?.split('T')[0],
			label: 'Due Date',
			hint: 'If a due date is set, the transaction will be marked as "Past Due" after the due date. If a due date is not set, the transaction will only be marked as "Due" after it\'s post date.',
		}),
		new Field('paidAt', {
			type: 'date',
			value: data?.paidAt?.split('T')[0],
			label: 'Payment Date',
			hint: 'When was this transaction paid?\n\nتاريخ الدفع',
		}),
		new Field('memo', {
			value: data?.memo,
			hint: 'Enter a short description of the transaction. This will be visible to the tenant user.',
		}),
	];
</script>

{#if formType === 'update'}
	<Form
		schema={updateSchema}
		{warnSchema}
		entity="leaseInvoice"
		{formType}
		{basicFields}
		onSubmit={(values) =>
			data &&
			api($page.data.apiConfig).leaseInvoices.update({
				id: data.id,
				updateLeaseInvoiceDto: values,
			})}
	/>
{:else}
	<Form
		schema={createSchema}
		{warnSchema}
		entity="leaseInvoice"
		{formType}
		{basicFields}
		onSubmit={(values) =>
			api($page.data.apiConfig).leaseInvoices.create({
				createLeaseInvoiceDto: values,
			})}
	/>
{/if}
