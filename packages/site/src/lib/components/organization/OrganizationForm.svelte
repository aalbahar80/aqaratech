<script lang="ts">
	import { page, session } from '$app/stores';
	import Form from '$lib/components/form/Form.svelte';
	import { Field } from '$lib/models/classes/Field.class';
	import { schema } from '$models/schemas/organization.schema';
	import type { OrganizationDto } from '@self/sdk';

	type TOrganizationDto = $$Generic<
		TOrganizations extends undefined ? OrganizationDto : undefined
	>;

	interface Props {
		formType: 'create' | 'update';
	}

	interface UpdateForm extends Props {
		formType: 'update';
		data: TOrganizationDto;
	}

	interface CreateForm extends Props {
		formType: 'create';
	}

	type $$Props = CreateForm | UpdateForm;

	export let formType: $$Props['formType'];
	export let data: TOrganizationDto = undefined as TOrganizationDto;

	const basicFields = [
		new Field('fullName', { required: true, value: data?.fullName }),
		new Field('label', {
			value: data?.label,
			hint: 'If a short name is provided, it will be used instead of the full name in the UI.',
		}),
	];
</script>

<Form
	{schema}
	entityTitle="organizations"
	{formType}
	{basicFields}
	onCreate={(values) =>
		$page.stuff.api.organizations.create({
			createOrganizationDto: values,
		})}
	onUpdate={(values) =>
		$page.stuff.api.organizations.update({
			id: data.id,
			updateOrganizationDto: values,
		})}
/>
