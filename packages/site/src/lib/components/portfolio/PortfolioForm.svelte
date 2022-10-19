<script lang="ts">
	import { page } from '$app/stores';
	import { createApi } from '$api';
	import Form from '$lib/components/form/Form.svelte';
	import { labelHint } from '$lib/constants/form-hints';
	import { Field } from '$lib/models/classes/Field.class';
	import { OrganizationIdField } from '$lib/utils/form/common-fields';
	import { schema } from '$models/schemas/portfolio.schema';
	import type { PortfolioDto } from '$api/openapi';

	type TPortfolioDto = $$Generic<
		// eslint-disable-next-line no-undef
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
		OrganizationIdField(
			data?.organizationId || $page.data.user?.role?.organizationId,
		),
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

{#if formType === 'update'}
	<Form
		{schema}
		entity="portfolio"
		{formType}
		{basicFields}
		onSubmit={(values) =>
			data && // type hack
			createApi().portfolios.update({
				id: data.id,
				updatePortfolioDto: values,
			})}
	/>
{:else}
	<Form
		{schema}
		entity="portfolio"
		{formType}
		{basicFields}
		onSubmit={(values) => {
			return createApi().portfolios.create({
				createPortfolioDto: values,
			});
		}}
	/>
{/if}
