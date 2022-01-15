import { z } from 'zod';

const clients = z.object({
	first_name: z.string().min(1, { message: 'Required' }),
	last_name: z.string().min(1, { message: 'Required' }),
	email: z.string().email(),
	phone: z.string().min(8).and(z.string().max(8)).or(z.literal('')),
});

export const v = {
	fallback: z.object({}),
	clients,
};
