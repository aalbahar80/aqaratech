<script lang="ts">
	import { page, session } from '$app/stores';
	import Form2 from '$lib/components/form/Form2.svelte';
	import { Field } from '$lib/models/classes/Field.class';
	import { toDateInput } from '$lib/utils/common';
	import { schema } from '$models/schemas/portfolio.schema.js';
	import type { PortfolioDto } from '@self/sdk';

	type TPortfolioDto = $$Generic<
		TPortfolios extends undefined ? PortfolioDto : undefined
	>;

	interface Props {
		formType: 'create' | 'update';
	}

	interface UpdateForm extends Props {
		formType: 'update';
		data: TPortfolioDto;
	}

	interface CreateForm extends Props {
		formType: 'create';
	}

	type $$Props = CreateForm | UpdateForm;

	export let formType: $$Props['formType'];
	export let data: TPortfolioDto = undefined as TPortfolioDto;

	const basicFields = [
		new Field('fullName', { required: true, value: data?.fullName }),
		new Field('shortName', {
			value: data?.shortName,
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
			value: data?.civilid,
		}),
		new Field('dob', {
			type: 'date',
			label: 'Date of Birth',
			value: toDateInput(data?.dob),
		}),
	];
</script>

<Form2
	{schema}
	entityTitle="portfolios"
	{formType}
	{basicFields}
	onCreate={(values) =>
		$page.stuff.api.portfolios.create({
			createPortfolioDto: {
				...values,
				organizationId: $session.user?.role.orgId,
			},
		})}
	onUpdate={(values) =>
		$page.stuff.api.portfolios.update({
			id: data.id,
			updatePortfolioDto: values,
		})}
/>
