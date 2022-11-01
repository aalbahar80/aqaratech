<script lang="ts">
	import { createApi } from '$api';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Form from '$lib/components/form/Form.svelte';
	import { Field } from '$lib/models/classes/Field.class';
	import type { PredefinedRole } from '$lib/models/interfaces/predefined.interface';
	import { addSuccessToast } from '$lib/stores/toast';
	import { entitiesMap, roleCreateSchema } from '@self/utils';

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
	schema={roleCreateSchema}
	entity="member"
	formType="create"
	{basicFields}
	onSubmit={(values) => {
		const organizationId = $page.data.user?.role?.organizationId;
		if (!organizationId) {
			// type hack
			throw new Error('No organizationId found in session');
		}

		const api = createApi().roles;

		if (predefined.entity === 'portfolio') {
			return api.createPortfolioRole({
				organizationId,
				portfolioId: predefined.entityId,
				createRoleDto: {
					email: values.email,
				},
			});
		} else if (predefined.entity === 'tenant') {
			return api.createTenantRole({
				organizationId,
				tenantId: predefined.entityId,
				createRoleDto: {
					email: values.email,
				},
			});
		} else if (predefined.entity === 'organization') {
			return api.createOrgAdminRole({
				organizationId,
				createRoleDto: {
					email: values.email,
				},
			});
		} else {
			throw new Error(`Unknown entity: ${predefined.entity}`);
		}
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
