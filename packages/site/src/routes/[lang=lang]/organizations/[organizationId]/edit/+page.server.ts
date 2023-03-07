import type { Actions } from './$types';
import { organizationSchema } from '@self/utils';

import { handleForm } from '$lib/components/form/handle-form';
import { DAYS_KEY, MONTHS_KEY } from '$lib/components/form/model/organization';

export const actions: Actions = {
	default: async (event) => {
		return await handleForm({
			entity: 'organization',
			schema: organizationSchema,
			event,
			onSubmit: async (api, data, event) => {
				const submitted = await api.organizations.update({
					id: event.params.organizationId,
					updateOrganizationDto: {
						...data,
						settings: {
							dueDuration: {
								// will be coerced to number by zod
								// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
								months: data[MONTHS_KEY],
								// will be coerced to number by zod
								// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
								days: data[DAYS_KEY],
							},
						},
					},
				});

				return submitted.id;
			},
		});
	},
};
