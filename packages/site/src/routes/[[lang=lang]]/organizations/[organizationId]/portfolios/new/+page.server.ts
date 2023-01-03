import type { Actions } from './$types';

import { portfolioCreateSchema } from '@self/utils';

import { handleForm } from '$lib/components/form/handle-form';

export const actions: Actions = {
	default: async (event) => {
		return await handleForm({
			entity: 'portfolio',
			schema: portfolioCreateSchema,
			event,
			onSubmit: async (api, data, event) => {
				const submitted = await api.organizations.createPortfolio({
					organizationId: event.params.organizationId,
					createPortfolioDto: data,
				});

				return submitted.id;
			},
		});
	},
};
