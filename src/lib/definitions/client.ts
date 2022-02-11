import { z } from 'zod';
import { Prisma } from '@prisma/client';

export type ClientData = Prisma.ClientGetPayload<typeof entityData>;
export const entityData = Prisma.validator<Prisma.ClientArgs>()({
	select: {
		id: true,
		firstName: true,
		lastName: true,
		email: true,
		phone: true,
		civilid: true,
	},
});

export const defaultForm: Omit<ClientData, 'id'> = {
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

// export default { formSchema, defaultForm };
