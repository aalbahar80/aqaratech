import { schema } from '$lib/definitions/unit';
import prismaClient from '$lib/server/prismaClient';
import * as trpc from '@trpc/server';
import { z } from 'zod';

export default trpc
	.router()
	.query('search', {
		input: z.string().optional(),
		resolve: ({ input }) =>
			prismaClient.unit.findMany({
				take: 5,
				orderBy: {
					updatedAt: 'desc',
				},
				select: {
					id: true,
					unitNumber: true,
				},
				where: input
					? {
							OR: [
								{ id: { contains: input } },
								{ unitNumber: { contains: input } },
							],
					  }
					: undefined,
			}),
	})
	.mutation('save', {
		input: schema,
		resolve: ({ input: { id, ...data } }) =>
			id
				? prismaClient.unit.update({
						data,
						where: { id },
						// select: { id: true },
				  })
				: prismaClient.unit.create({
						data,
						// select: { id: true },
				  }),
	});
