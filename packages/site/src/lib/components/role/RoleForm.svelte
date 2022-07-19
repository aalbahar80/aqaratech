<script lang="ts">
	import { page } from '$app/stores';
	import Form from '$lib/components/form/Form.svelte';
	import { Field } from '$lib/models/classes/Field.class';
	import type { PredefinedRole } from '$lib/models/interfaces/predefined.interface';
	import { createSchema } from '$lib/models/schemas/role.schema';

	export let predefined: PredefinedRole;

	const basicFields = [
		new Field(predefined.fieldName, {
			value: predefined.fieldValue,
			disabled: true,
			autoInit: true,
			type: 'text',
		}),
		new Field('email', { type: 'email' }),
	];
</script>

<Form
	schema={createSchema}
	entityTitle="roles"
	formType="create"
	{basicFields}
	onCreate={(values) => $page.stuff.api.roles.create({ createRoleDto: values })}
/>
