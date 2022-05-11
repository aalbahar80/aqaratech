import { addToast } from '$lib/stores/toast';
import { z } from 'zod';

export const handleInvite = async (clientId: string) => {
	try {
		const res = await fetch(`/clients/${clientId}/invite`, {
			method: 'POST',
			body: JSON.stringify({ clientId }),
		});
		const raw = await res.json();

		const Data = z.object({
			email: z.string().email().optional(),
			message: z.string(),
		});

		const data = Data.parse(raw);

		if (res.ok) {
			addToast({
				duration: 90000,
				props: {
					kind: 'success',
					title: 'Sent',
					subtitle: `${data.message}`,
				},
			});
		} else {
			addToast({
				duration: 90000,
				props: {
					kind: 'error',
					title: 'Error',
					subtitle: `${data.message}`,
				},
			});
		}
	} catch (e) {
		console.error(e);
		addToast({
			props: {
				kind: 'error',
				title: 'Error',
				// subtitle: `${e.message}`,
			},
		});
	}
};
