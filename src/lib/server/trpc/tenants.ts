import prismaClient from '$lib/server/prismaClient';
// import { falsyToNull, trim } from '$lib/zodTransformers';
import { z } from 'zod';
import * as trpc from '@trpc/server';

export const saveInput = z.object({
	// TODO replace z.undefined with z.never?
	// TODO what happens if i pass in manual createdAt and updatedAt?
	id: z.string().optional(),
	firstName: z.string().min(1, { message: 'Required' }),
	lastName: z.string().min(1, { message: 'Required' }),
	email: z.string().email(),
	phone: z.string().min(8).and(z.string().max(8)),
	// civilid: z
	// 	.string()
	// 	.min(12)
	// 	.and(z.string().max(12))
	// 	.or(z.literal(''))
	// 	.refine((val) => val.length === 0 || val.match(/^[0-9]+$/) !== null, {
	// 		message: 'Civil ID must contain only numbers',
	// 	}),
});

export default trpc
	.router()
	.query('read', {
		input: z.string(),
		resolve: ({ input: id }) =>
			prismaClient.tenant.findUnique({
				where: {
					id,
				},
				select: {
					id: true,
					firstName: true,
					secondName: true,
					lastName: true,
					email: true,
					phone: true,
					dob: true,
					civilid: true,
					createdAt: true,
					updatedAt: true,
					leases: {
						include: {
							transactions: true,
							unit: {
								include: {
									property: true,
								},
							},
						},
					},
				},
			}),
	})
	.mutation('save', {
		input: saveInput,
		resolve: ({ input: { id, ...data } }) =>
			id
				? prismaClient.tenant.update({
						data,
						where: { id },
						select: { id: true },
				  })
				: prismaClient.tenant.create({ data, select: { id: true } }),
	});
