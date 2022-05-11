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
			user_id: z.string(),
			email: z.string().email(),
		});
		const data = Data.parse(raw);
		addToast({
			props: {
				kind: 'success',
				title: 'Sent',
				subtitle: `Invite sent to ${data.email}`,
			},
		});
	} catch (e) {
		console.error(e);
		addToast({
			props: {
				kind: 'error',
				title: 'Failed to send email',
			},
		});
	}
};
