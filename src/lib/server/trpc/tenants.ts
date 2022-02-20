import { saveInput } from '$lib/definitions/tenant';
import prismaClient from '$lib/server/prismaClient';
import { getSkip } from '$lib/utils/table-utils';
import * as trpc from '@trpc/server';
import { z } from 'zod';

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
	.query('basic', {
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
					thirdName: true,
					lastName: true,
					email: true,
					phone: true,
					dob: true,
					civilid: true,
					createdAt: true,
					updatedAt: true,
				},
			}),
	})
	.query('list', {
		input: z.string().nullable(),
		resolve: ({ input }) =>
			prismaClient.tenant.findMany({
				take: 10,
				skip: getSkip(input, 10),
				orderBy: {
					updatedAt: 'desc',
				},
				select: {
					id: true,
					firstName: true,
					lastName: true,
					email: true,
					phone: true,
					updatedAt: true,
					createdAt: true,
				},
			}),
	})
	.mutation('save', {
		// input: saveInput,
		input: saveInput,
		resolve: ({ input: { id, ...data } }) =>
			id
				? prismaClient.tenant.update({
						data,
						where: { id },
						// select: { id: true },
				  })
				: prismaClient.tenant.create({
						data,
						// select: { id: true },
				  }),
	});
