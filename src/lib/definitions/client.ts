import { z } from 'zod';

const entityData = {};
const defaultForm = {};

export const formSchema = z.object({
	first_name: z.string().min(1, { message: 'Required' }),
	last_name: z.string().min(1, { message: 'Required' }),
	email: z.string().email(),
	phone: z.string().min(8).and(z.string().max(8)).or(z.literal('')),
});

export default { entityData, formSchema, defaultForm };
