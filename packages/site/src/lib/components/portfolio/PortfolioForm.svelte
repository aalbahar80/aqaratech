<script lang="ts">
	import { page, session } from '$app/stores';
	import Form from '$lib/components/form/Form.svelte';
	import { labelHint } from '$lib/constants/form-hints';
	import { Field } from '$lib/models/classes/Field.class';
	import { schema } from '$models/schemas/portfolio.schema';
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
		new Field('fullName', {
			required: true,
			value: data?.fullName,
			label: 'Portfolio Name (full)',
		}),
		new Field('label', {
			value: data?.label,
			hint: labelHint,
		}),
		new Field('phone', { value: data?.phone }),
		new Field('civilid', {
			label: 'Civil ID',
			value: data?.civilid,
		}),
		new Field('dob', {
			type: 'date',
			label: 'Date of Birth',
			value: data?.dob?.split('T')[0],
		}),
	];
</script>

<Form
	{schema}
	entityTitle="portfolios"
	{formType}
	{basicFields}
	onCreate={(values) => {
		const organizationId = $session.user?.role.organizationId;
		if (!organizationId) {
			// Type Redundancy
			throw new Error('No organizationId found in session');
		}
		return $page.stuff.api.portfolios.create({
			createPortfolioDto: {
				...values,
				organizationId,
			},
		});
	}}
	onUpdate={(values) => {
		if (!data) {
			// Type Redundancy
			throw new Error('No data found in form');
		}
		return $page.stuff.api.portfolios.update({
			id: data.id,
			updatePortfolioDto: values,
		});
	}}
/>
