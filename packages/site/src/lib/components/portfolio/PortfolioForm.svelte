<script lang="ts">
	import { createApi } from '$api';
	import type { PortfolioDto } from '$api/openapi';
	import { page } from '$app/stores';
	import Form from '$lib/components/form/Form.svelte';
	import { labelHint } from '$lib/constants/form-hints';
	import { Field } from '$lib/models/classes/Field.class';
	import { OrganizationIdField } from '$lib/utils/form/common-fields';
	import { portfolioCreateSchema, portfolioUpdateSchema } from '@self/utils';

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
		schema={portfolioUpdateSchema}
		entity="portfolio"
		{formType}
		{basicFields}
		onSubmit={(values) =>
			createApi().portfolios.update({
				id: data.id,
				updatePortfolioDto: values,
			})}
	/>
{:else}
	<Form
		schema={portfolioCreateSchema}
		entity="portfolio"
		{formType}
		{basicFields}
		onSubmit={(values) => {
			return createApi().organizations.createPortfolio({
				createPortfolioDto: values,
				organizationId: $page.data.user?.role?.organizationId ?? '', // type hack
			});
		}}
	/>
{/if}
