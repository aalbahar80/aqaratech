import { entitiesMap } from '@self/utils';

import { addToast } from '$lib/stores/toast';

export const copyTrxUrl = (id: string, origin: string) => {
	navigator.clipboard
		.writeText(`${origin}/${entitiesMap.leaseInvoice.urlName}/${id}`)
		.catch((e) => {
			console.error(e);
			addToast({
				duration: 3000,
				props: {
					kind: 'error',
					title: 'Unable to copy link',
				},
			});
		});
	addToast({
		duration: 3000,
		props: {
			kind: 'success',
			title: 'Copied link to clipboard!',
		},
	});
};
