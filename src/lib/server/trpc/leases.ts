import { saveInput } from '$lib/definitions/lease';
import prismaClient from '$lib/server/prismaClient';
import { getSkip } from '$lib/utils/table-utils';
import * as trpc from '@trpc/server';
import { z } from 'zod';

export default trpc
	.router()
	.query('read', {
		input: z.string(),
		resolve: ({ input: id }) =>
			prismaClient.lease.findUnique({
				where: {
					id,
				},
			}),
	})
	.query('list', {
		input: z.string().nullable(),
		resolve: ({ input }) =>
			prismaClient.lease.findMany({
				take: 10,
				skip: getSkip(input, 10),
				orderBy: {
					updatedAt: 'desc',
				},
			}),
	})
	.mutation('save', {
		input: saveInput,
		resolve: ({ input: { id, ...data } }) =>
			id
				? prismaClient.lease.update({
						data,
						where: { id },
						// select: { id: true },
				  })
				: prismaClient.lease.create({
						data,
						// select: { id: true },
				  }),
	});
