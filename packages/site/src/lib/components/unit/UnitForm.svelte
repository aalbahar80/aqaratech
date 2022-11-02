<script lang="ts">
	import { createApi } from '$api';
	import type { UnitDto } from '$api/openapi';
	import { page } from '$app/stores';
	import Form from '$lib/components/form/Form.svelte';
	import { labelHint } from '$lib/constants/form-hints';
	import { unitTypeOptions } from '$lib/constants/unit-options';
	import { Field, SelectField } from '$lib/models/classes/Field.class';
	import { unitCreateSchema, unitUpdateSchema } from '@self/utils';

	export let data: UnitDto | undefined = undefined;

	const basicFields = [
		new SelectField('type', {
			value: data?.type,
			options: unitTypeOptions,
			autoInit: true,
		}),
		new Field('unitNumber', { required: true, value: data?.unitNumber }),
		new Field('bed', { type: 'number', value: data?.bed }),
		new Field('bath', { type: 'number', value: data?.bath }),
		new Field('size', { type: 'number', value: data?.size }),
		new Field('marketRent', { type: 'number', value: data?.marketRent }),
		new Field('floor', { type: 'number', value: data?.floor }),
		new Field('usage', { value: data?.usage }),
		new Field('label', {
			value: data?.label,
			hint: labelHint,
		}),
	];
</script>

{#if data}
	<Form
		schema={unitUpdateSchema}
		entity="unit"
		formType="update"
		{basicFields}
		onSubmit={(values) =>
			createApi().units.update({
				id: data.id,
				updateUnitDto: values,
			})}
	/>
{:else}
	<Form
		schema={unitCreateSchema.omit({ portfolioId: true, propertyId: true })}
		entity="unit"
		formType="create"
		{basicFields}
		onSubmit={(values) =>
			createApi().organizations.createUnit({
				createUnitDto: {
					...values,
					propertyId: $page.params.propertyId,
					portfolioId: $page.params.portfolioId,
				},
				organizationId: $page.params.organizationId,
			})}
	/>
{/if}
