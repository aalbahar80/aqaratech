import { handleForm } from '$lib/components/form/handle-form';
import { leaseInvoiceCreateSchema } from '@self/utils';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		return handleForm({
			entity: 'leaseInvoice',
			schema: leaseInvoiceCreateSchema,
			checkboxKeys: {
				isPaid: true,
			},
			event,
			onSubmit: async (api, data, event) => {
				const submitted = await api.organizations.createLeaseInvoice({
					organizationId: event.params.organizationId,
					createLeaseInvoiceDto: data,
				});

				return submitted.id;
			},

			fromParams: ['portfolioId'],
			fromQuery: ['leaseId'],
		});
	},
};
