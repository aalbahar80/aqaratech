import { Tenant } from '$lib/models/classes/tenant.class';
import prismaClient from '$lib/server/prismaClient';
import { paginationSchema } from '$models/common';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './createRouter';

export const tenants = createRouter()
	.query('read', {
		input: z.string(),
		resolve: async ({ input: id }) => {
			const data = await prismaClient.tenant.findUnique({
				where: {
					id,
				},
				select: {
					id: true,
					fullName: true,
					shortName: true,
					email: true,
					phone: true,
					dob: true,
					civilid: true,
					passportNum: true,
					nationality: true,
					residencyEnd: true,
					residencyNum: true,
					createdAt: true,
					updatedAt: true,
					leases: {
						orderBy: { start: 'desc' },
						include: {
							transactions: { orderBy: { postAt: 'desc' } },
							unit: {
								include: {
									property: true,
								},
							},
						},
					},
				},
			});
			if (data) return data;
			throw new TRPCError({ code: 'NOT_FOUND', message: 'Tenant not found' });
		},
	})
	.query('basic', {
		input: z.string(),
		resolve: async ({ input: id }) => {
			const data = await prismaClient.tenant.findUnique({
				where: {
					id,
				},
				select: {
					id: true,
					fullName: true,
					shortName: true,
					email: true,
					phone: true,
					dob: true,
					civilid: true,
					passportNum: true,
					nationality: true,
					residencyEnd: true,
					residencyNum: true,
					createdAt: true,
					updatedAt: true,
				},
			});
			if (data) return data;
			throw new TRPCError({ code: 'NOT_FOUND' });
		},
	})
	.query('list', {
		input: paginationSchema,
		resolve: async ({ input }) => ({
			data: await prismaClient.tenant.findMany({
				take: input.size,
				skip: input.size * (input.pageIndex - 1),
				orderBy: {
					updatedAt: 'desc',
				},
				select: {
					id: true,
					fullName: true,
					shortName: true,
					email: true,
					phone: true,
					updatedAt: true,
					createdAt: true,
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
			size: z.number().optional(),
		}),
		resolve: ({ input: { query, size } }) =>
			prismaClient.tenant.findMany({
				take: size || 20,
				orderBy: {
					updatedAt: 'desc',
				},
				where: query
					? {
							OR: [
								{ id: { contains: query } },
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
		resolve: () => prismaClient.tenant.count({}),
	})
	.mutation('create', {
		input: Tenant.schema,
		resolve: async ({ input }) => {
			const { id, ...data } = input;
			return prismaClient.tenant.create({
				data: {
					...data,
					...(id ? { id } : {}),
				},
			});
		},
	})
	.mutation('save', {
		input: Tenant.schema,
		resolve: ({ input: { id, ...data } }) =>
			id
				? prismaClient.tenant.update({
						data,
						where: { id },
				  })
				: prismaClient.tenant.create({
						data,
				  }),
	})
	.mutation('delete', {
		input: z.string(),
		resolve: ({ input: id }) =>
			prismaClient.tenant.delete({
				where: {
					id,
				},
				select: {
					id: true,
				},
			}),
	});
