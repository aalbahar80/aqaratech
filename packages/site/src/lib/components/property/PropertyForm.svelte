<script lang="ts">
	import { page, session } from '$app/stores';
	import Form2 from '$lib/components/form/Form2.svelte';
	import { areas } from '$lib/config/constants';
	import { Field, SelectField } from '$lib/models/classes/Field.class';
	import type { PredefinedProperty } from '$lib/models/interfaces/predefined.interface';
	import { schema } from '$models/schemas/property.schema.js';
	import type { PaginatedPortfolioDto, PropertyDto } from '@self/sdk';

	export let data: PropertyDto | undefined = undefined;
	export let portfolios: PaginatedPortfolioDto;
	export let predefined: PredefinedProperty | undefined = undefined;

	const formType = data && 'id' in data ? 'update' : 'create';

	const basicFields = [
		new SelectField('portfolioId', {
			label: 'Portfolio',
			required: true,
			value: data?.portfolioId || predefined?.portfolioId,
			combobox: true,
			disabled: formType === 'update',
			options: portfolios.results.map((portfolio) => ({
				value: portfolio.id,
				label: portfolio.fullName,
			})),
		}),
		new SelectField('area', {
			required: true,
			value: data?.area,
			combobox: true,
			options: areas.map((area) => ({
				value: area[1],
				label: `${area[0]} | ${area[1]}`,
			})),
		}),
		new Field('block', { required: true, value: data?.block }),
		new Field('avenue', { value: data?.avenue }),
		new Field('street', { required: true, value: data?.street }),
		new Field('number', { required: true, value: data?.number }),
		new Field('parcel', {
			required: false,
			value: data?.parcel,
			hint: 'رقم القسيمة',
		}),
		new Field('paci', {
			required: false,
			value: data?.paci,
			hint: 'الرقم الآلي للعنوان',
		}),
	];
</script>

<Form2
	schema={formType === 'create' ? schema : schema.omit({ portfolioId: true })}
	entityTitle="properties"
	{formType}
	{basicFields}
	initialValues={{ area: data?.area }}
	onCreate={(values) =>
		$page.stuff.api.properties.create({
			createPropertyDto: {
				...values,
				organizationId: $session.user?.role.orgId,
			},
		})}
	onUpdate={(values) =>
		$page.stuff.api.properties.update({
			id: data.id,
			updatePropertyDto: values,
		})}
/>
