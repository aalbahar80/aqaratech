<script lang="ts">
	import { page, session } from '$app/stores';
	import Form2 from '$lib/components/form/Form2.svelte';
	import { Field } from '$lib/models/classes/Field.class';
	import { schema } from '$models/schemas/portfolio.schema.js';
	import * as R from 'remeda';

	// TODO infer id if update form
	let id = '';
	const data = {
		id: 'string',
		createdAt: '2022-07-12T19:30:29.162Z',
		updatedAt: '2022-07-12T19:30:29.162Z',
		organizationId: 'string',
		fullName: 'string',
		shortName: null,
		civilid: null,
		phone: null,
		email: null,
		dob: null,
	};

	const basicFields = [
		new Field('fullName', { required: true, value: data?.fullName }),
		new Field('shortName', {
			value: R.pathOr(data, ['shortName'], ''),
			hint: 'If a short name is provided, it will be used instead of the full name in the UI.',
		}),
		new Field('email', {
			type: 'email',
			hint: "Once a portfolio's email has been entered, you will be able to send them a portal invitation.",
			value: data?.email,
		}),
		new Field('phone', { value: data?.phone }),
		new Field('civilid', {
			label: 'Civil ID',
			value: R.pathOr(data, ['civilid'], ''),
		}),
		new Field('dob', {
			type: 'date',
			label: 'Date of Birth',
			// value: toDateInput(R.pathOr(data, ['dob'], '')),
		}),
	];
</script>

<Form2
	{schema}
	entityTitle="portfolios"
	formType="create"
	{basicFields}
	onCreate={async (values) => {
		$page.stuff.api.portfolios.create({
			createPortfolioDto: {
				...values,
				organizationId: $session.user?.role.orgId,
			},
		});
	}}
	onUpdate={async (values) => {
		$page.stuff.api.portfolios.update({
			id: values.id,
			updatePortfolioDto: values,
		});
	}}
/>
