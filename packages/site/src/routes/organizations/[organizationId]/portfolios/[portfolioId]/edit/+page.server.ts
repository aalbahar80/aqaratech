import { handleForm } from '$lib/components/form/handle-form';
import { portfolioUpdateSchema } from '@self/utils';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		return handleForm({
			entity: 'portfolio',
			schema: portfolioUpdateSchema,
			event,
			onSubmit: async (api, data, event) => {
				const submitted = await api.portfolios.update({
					id: event.params.portfolioId,
					updatePortfolioDto: data,
				});

				return submitted.id;
			},
		});
	},
};
