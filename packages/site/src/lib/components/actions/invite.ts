import { addToast } from '$lib/stores/toast';
import { z } from 'zod';

export const handleInvite = async (
	id: string,
	userType: 'propertyOwner' | 'tenant',
) => {
	try {
		const Input = z.object({
			id: z.string().uuid(),
			userType: z.enum(['propertyOwner', 'tenant']),
		});
		const input = Input.parse({ id, userType });
		const urlPrefix =
			input.userType === 'propertyOwner' ? 'portfolios' : 'tenants';
		// TODO: is this endpoint protected?
		const res = await fetch(`/${urlPrefix}/${input.id}/invite`, {
			method: 'POST',
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
