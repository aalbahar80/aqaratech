import { z } from 'zod';
import type { PropertyData } from './select';

export const defaultForm: Omit<PropertyData, 'id' | 'createdAt' | 'updatedAt'> =
	{
		area: '',
		block: '',
		street: '',
		number: '',
	};

export const formSchema = z.object({
	area: z.string().min(1, { message: 'Required' }),
	block: z.string().min(1, { message: 'Required' }),
	street: z.string().min(1, { message: 'Required' }),
	number: z.string().min(1, { message: 'Required' }),
});

export default { formSchema, defaultForm };
