<script lang="ts">
	import { goto } from '$app/navigation';
	import { page, session } from '$app/stores';
	import Form from '$lib/components/form/Form.svelte';
	import { entityNameMap } from '$lib/constants/names';
	import { Field } from '$lib/models/classes/Field.class';
	import type { PredefinedRole } from '$lib/models/interfaces/predefined.interface';
	import { createSchema } from '$lib/models/schemas/role.schema';
	import { addSuccessToast } from '$lib/stores/toast';

	export let predefined: PredefinedRole;

	const basicFields = [
		new Field(predefined.idField, {
			value: predefined.entityId,
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
	onSubmit={(values) => {
		const organizationId = $session.user?.role.organizationId;
		if (!organizationId) {
			// type hack
			throw new Error('No organizationId found in session');
		}
		return $page.stuff.api.roles.create({
			createRoleDto: {
				roleType: predefined.roleType,
				organizationId,
				...values,
			},
		});
	}}
	onSuccess={() => {
		addSuccessToast(
			'Member added. An email invitation will be sent to the user.',
		);
		return goto(
			`/${entityNameMap[predefined.entity].urlName}/${predefined.entityId}`,
		);
	}}
/>
