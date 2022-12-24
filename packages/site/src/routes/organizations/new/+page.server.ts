import type { Actions } from './$types';

import { getRoute, organizationSchema, PageType } from '@self/utils';

import { handleForm } from '$lib/components/form/handle-form';

export const actions: Actions = {
	default: async (event) => {
		return await handleForm({
			entity: 'organization',
			schema: organizationSchema,
			event,
			onSubmit: async (api, data) => {
				const submitted = await api.organizations.create({
					createOrganizationDto: data,
				});

				return submitted;
			},

			redirectTo: (submitted) => {
				const orgInfoPage = getRoute({
					entity: 'organization',
					id: submitted.organization.id,
					pageType: PageType.Id,
					params: {},
				});

				// Switch cookies to new organization/role and redirect to the new org's info page
				return `/auth/roles/${submitted.roleId}?redirectTo=${orgInfoPage}`;
			},
		});
	},
};
