<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { createApi } from '$api';
	import Form from '$lib/components/form/Form.svelte';
	import { Field } from '$lib/models/classes/Field.class';
	import type { PredefinedRole } from '$lib/models/interfaces/predefined.interface';
	import { createSchema } from '$lib/models/schemas/role.schema';
	import { addSuccessToast } from '$lib/stores/toast';
	import { entitiesMap } from '@self/utils';

	export let predefined: PredefinedRole;

	const basicFields = [
		new Field(predefined.idField, {
			value: predefined.entityId,
			disabled: true,
			autoInit: true,
			hidden: true,
			type: 'text',
		}),
		new Field('email', { type: 'email' }),
	];
</script>

<Form
	schema={createSchema}
	entity="member"
	formType="create"
	{basicFields}
	onSubmit={(values) => {
		const organizationId = $page.data.user?.role?.organizationId;
		if (!organizationId) {
			// type hack
			throw new Error('No organizationId found in session');
		}
		return createApi().roles.create({
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
			`/${entitiesMap[predefined.entity].urlName}/${predefined.entityId}`,
		);
	}}
/>
