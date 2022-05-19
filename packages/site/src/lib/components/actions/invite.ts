import { addToast } from '$lib/stores/toast';
import { z } from 'zod';

export const handleInvite = async (
	clientId: string,
	userType: 'client' | 'tenant',
) => {
	try {
		// TODO: is this endpoint protected?
		const res = await fetch(`/clients/${clientId}/invite`, {
			method: 'POST',
			body: JSON.stringify({ clientId }),
		});
		const raw = await res.json();

		const Data = z.object({
			email: z.string().email().optional(),
			errorMsg: z.string().optional(),
		});

		const data = Data.parse(raw);

		if (res.ok) {
			addToast({
				duration: 90000,
				props: {
					kind: 'success',
					title: 'Sent',
					subtitle: `Invitation sent to ${data.email}`,
				},
			});
		} else {
			addToast({
				duration: 90000,
				props: {
					kind: 'error',
					title: 'Error',
					subtitle: `${data.errorMsg}`,
				},
			});
		}
	} catch (e) {
		console.error(e);
		addToast({
			props: {
				kind: 'error',
				title: 'Error',
			},
		});
	}
};
