import { z } from 'zod';
import type { ClientData } from './select';

export const defaultForm: Omit<ClientData, 'id' | 'createdAt' | 'updatedAt'> = {
	firstName: null,
	lastName: null,
	phone: null,
	email: null,
	civilid: null,
};
export const formSchema = z.object({
	firstName: z.string().min(1, { message: 'Required' }),
	lastName: z.string().min(1, { message: 'Required' }),
	email: z.string().email(),
	phone: z.string().min(8).and(z.string().max(8)).or(z.literal('')),
});

export default { formSchema, defaultForm };
