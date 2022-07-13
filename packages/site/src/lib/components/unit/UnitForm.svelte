<script lang="ts">
	import { page, session } from '$app/stores';
	import Form2 from '$lib/components/form/Form2.svelte';
	import { Field, SelectField } from '$lib/models/classes/Field.class';
	import type { PredefinedUnit } from '$lib/models/interfaces/predefined.interface';
	import { getAddress } from '$lib/utils/get-label';
	import { schema } from '$models/schemas/unit.schema.js';
	import type {
		PaginatedPortfolioDto,
		PaginatedPropertyDto,
		UnitDto,
	} from '@self/sdk';

	export let data: UnitDto | undefined = undefined;
	export let portfolios: PaginatedPortfolioDto;
	export let properties: PaginatedPropertyDto;
	export let predefined: PredefinedUnit | undefined = undefined;

	console.log({ portfolios }, 'UnitForm.svelte ~ 19');
	console.log({ properties }, 'UnitForm.svelte ~ 20');
	const formType = data && 'id' in data ? 'update' : 'create';

	const basicFields = [
		new SelectField('portfolioId', {
			label: 'Portfolio',
			required: true,
			value: data?.breadcrumbs?.portfolio.id || predefined?.portfolioId,
			combobox: true,
			disabled: formType === 'update',
			options: portfolios.results.map((portfolio) => ({
				value: portfolio.id,
				label: portfolio.fullName,
			})),
		}),
		new SelectField('propertyId', {
			label: 'Property',
			required: true,
			value: data?.propertyId || predefined?.propertyId,
			combobox: true,
			disabled: formType === 'update',
			options: properties.results.map((property) => ({
				value: property.id,
				label: getAddress(property),
			})),
		}),
		// new SelectField('type', {
		// 	value: data?.type,
		// 	options: unitTypeOptions,
		// }),
		new Field('unitNumber', { required: true, value: data?.unitNumber }),
		new Field('bed', { type: 'number', value: data?.bed }),
		new Field('bath', { type: 'number', value: data?.bath }),
		new Field('size', { type: 'number', value: data?.size }),
		new Field('marketRent', { type: 'number', value: data?.marketRent }),
		new Field('floor', { type: 'number', value: data?.floor }),
		new Field('usage', { value: data?.usage }),
	];
</script>

<Form2
	schema={formType === 'create' ? schema : schema.omit({ portfolioId: true })}
	entityTitle="units"
	{formType}
	{basicFields}
	onCreate={(values) => $page.stuff.api.units.create({ createUnitDto: values })}
	onUpdate={(values) =>
		$page.stuff.api.units.update({
			id: data.id,
			updateUnitDto: values,
		})}
/>
