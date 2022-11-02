<script lang="ts">
	import { createApi } from '$api';
	import { page } from '$app/stores';
	import Form from '$lib/components/form/Form.svelte';
	import { Field } from '$lib/models/classes/Field.class';
	import {
		OrganizationIdField,
		PortfolioIdField,
	} from '$lib/utils/form/common-fields';
	import { payoutCreateSchema } from '@self/utils';

	const basicFields = [
		OrganizationIdField($page.data.user?.role?.organizationId),
		PortfolioIdField($page.params.portfolioId),
		new Field('amount', {
			required: true,
			type: 'number',
		}),
		new Field('postAt', {
			required: true,
			type: 'date',
			value: new Date().toISOString().split('T')[0],
			label: 'Post Date',
		}),
		new Field('memo', {
			hint: 'Enter a short description of the payout. This will be visible to the portfolio user.',
		}),
	];
</script>

<Form
	schema={payoutCreateSchema}
	entity="payout"
	formType="create"
	{basicFields}
	onSubmit={(values) => createApi().payouts.create({ createPayoutDto: values })}
/>
