import { z } from 'zod';

import type { Actions } from './$types';
import { getRoute, PageTab, roleCreateSchema } from '@self/utils';

import { handleForm } from '$lib/components/form/handle-form';

export const actions: Actions = {
	default: async (event) => {
		// TODO satsifies satisfies Readonly<Entity[]>;
		const keys = ['organization', 'portfolio', 'tenant'] as const;

		const schema = z.object({
			relationKey: z.enum(keys),
			relationValue: z.string().uuid(),
		});

		const { relationKey, relationValue } = schema.parse({
			relationKey: event.url.searchParams.get('relationKey'),
			relationValue: event.url.searchParams.get('relationValue'),
		});

		return await handleForm({
			entity: 'role',
			schema: roleCreateSchema,
			event,
			onSubmit: async (api, data, event) => {
				let submitted;

				if (relationKey === 'tenant') {
					submitted = await api.roles.createTenantRole({
						createRoleDto: data,
						tenantId: relationValue,
						organizationId: event.params.organizationId,
					});
				} else if (relationKey === 'portfolio') {
					submitted = await api.roles.createPortfolioRole({
						createRoleDto: data,
						portfolioId: relationValue,
						organizationId: event.params.organizationId,
					});
					// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				} else if (relationKey === 'organization') {
					submitted = await api.roles.createOrgAdminRole({
						createRoleDto: data,
						organizationId: event.params.organizationId,
					});
				} else {
					throw new Error('Invalid relationKey');
				}

				return submitted.id;
			},

			redirectTo: () =>
				getRoute({
					entity: relationKey,
					id: relationValue,
					pageType: PageTab.Roles,
					params: event.params,
				}),
		});
	},
};
