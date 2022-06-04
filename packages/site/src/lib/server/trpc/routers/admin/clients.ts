import prismaClient from '$lib/server/prismaClient';
import { paginationSchema } from '$models/common';
import { Client } from '$models/classes/client.class';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './createRouter';

export const clients = createRouter()
	.query('read', {
		input: z.string(),
		resolve: async ({ input: id }) => {
			const data = await prismaClient.client.findUnique({
				where: {
					id,
				},
				include: {
					properties: true,
				},
			});
			if (data) return data;
			throw new TRPCError({ code: 'NOT_FOUND', message: 'Client not found' });
		},
	})
	.query('basic', {
		input: z.string(),
		resolve: async ({ input: id }) => {
			const data = await prismaClient.client.findUnique({
				where: {
					id,
				},
				select: {
					id: true,
					createdAt: true,
					updatedAt: true,
					firstName: true,
					secondName: true,
					lastName: true,
					fullName: true,
					shortName: true,
					phone: true,
					email: true,
					civilid: true,
					dob: true,
				},
			});
			if (data) return data;
			throw new TRPCError({ code: 'NOT_FOUND' });
		},
	})
	.query('list', {
		input: paginationSchema,
		resolve: async ({ input }) => ({
			data: await prismaClient.client.findMany({
				take: input.size,
				skip: input.size * (input.pageIndex - 1),
				orderBy: {
					updatedAt: 'desc',
				},
				select: {
					id: true,
					firstName: true,
					lastName: true,
					secondName: true,
					fullName: true,
					shortName: true,
					phone: true,
					email: true,
				},
			}),
			pagination: {
				size: input.size,
				start: input.size * (input.pageIndex - 1) + 1,
				pageIndex: input.pageIndex,
			},
		}),
	})
	.query('search', {
		input: z.object({
			query: z.string().optional(),
		}),
		resolve: ({ input: { query } }) =>
			prismaClient.client.findMany({
				take: 20,
				orderBy: {
					updatedAt: 'desc',
				},
				select: {
					id: true,
					firstName: true,
					lastName: true,
					fullName: true,
					shortName: true,
				},
				where: query
					? {
							OR: [
								{ id: { contains: query } },
								{ firstName: { contains: query } },
								{ secondName: { contains: query } },
								{ thirdName: { contains: query } },
								{ lastName: { contains: query } },
								{ fullName: { contains: query } },
								{ shortName: { contains: query } },
								{ email: { contains: query } },
								{ phone: { contains: query } },
								{ civilid: { contains: query } },
							],
					  }
					: {},
			}),
	})
	.query('count', {
		resolve: () => prismaClient.client.count({}),
	})
	.mutation('create', {
		input: Client.schema,
		resolve: ({ input }) => {
			const { id, ...data } = input;
			return prismaClient.client.create({
				data: {
					...data,
					...(id ? { id } : {}),
				},
			});
		},
	})
	.mutation('save', {
		input: Client.schema,
		resolve: ({ input: { id, ...data } }) =>
			id
				? prismaClient.client.update({
						data,
						where: { id },
				  })
				: prismaClient.client.create({
						data,
				  }),
	})
	.mutation('delete', {
		input: z.string(),
		resolve: ({ input: id }) =>
			prismaClient.client.delete({
				where: {
					id,
				},
				select: {
					id: true,
				},
			}),
	});
