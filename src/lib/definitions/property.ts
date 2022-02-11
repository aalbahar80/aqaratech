import { z } from 'zod';
import { Prisma } from '@prisma/client';

export type PropertyData = Prisma.PropertyGetPayload<typeof entityData>;
export const entityData = Prisma.validator<Prisma.PropertyArgs>()({
	select: {
		id: true,
		area: true,
		block: true,
		street: true,
		number: true,
	},
});

export const defaultForm: Omit<PropertyData, 'id'> = {
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

export default { entityData, formSchema, defaultForm };
