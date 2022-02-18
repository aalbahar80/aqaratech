import prismaClient from '$lib/server/prismaClient';
// import { falsyToNull, trim } from '$lib/zodTransformers';
import { z } from 'zod';
import * as trpc from '@trpc/server';
import { saveInput } from '$lib/definitions/tenant';

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
