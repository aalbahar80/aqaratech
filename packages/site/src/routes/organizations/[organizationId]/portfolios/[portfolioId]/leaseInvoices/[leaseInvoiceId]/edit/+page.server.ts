import { handleForm } from '$lib/components/form/handle-form';
import { leaseInvoiceUpdateSchema } from '@self/utils';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		return handleForm({
			entity: 'leaseInvoice',
			schema: leaseInvoiceUpdateSchema,
			checkboxKeys: {
				isPaid: true,
			},
			event,
			onSubmit: async (api, data, event) => {
				const submitted = await api.leaseInvoices.update({
					id: event.params.leaseInvoiceId,
					updateLeaseInvoiceDto: data,
				});

				return submitted.id;
			},
		});
	},
};
