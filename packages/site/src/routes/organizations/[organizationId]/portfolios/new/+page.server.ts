import { handleForm } from '$lib/components/form/handle-form';
import { portfolioCreateSchema } from '@self/utils';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		return handleForm({
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
