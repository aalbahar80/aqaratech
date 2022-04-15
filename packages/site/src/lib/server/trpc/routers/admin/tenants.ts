import prismaClient from '$lib/server/prismaClient';
import { paginationSchema } from '$models/common';
import { TenantModel } from '$models/interfaces/tenant.interface';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from '.';

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
					firstName: true,
					secondName: true,
					lastName: true,
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
							transactions: true,
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
					firstName: true,
					secondName: true,
					thirdName: true,
					lastName: true,
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
					firstName: true,
					lastName: true,
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
		}),
		resolve: ({ input: { query } }) =>
			prismaClient.tenant.findMany({
				take: 20,
				orderBy: {
					updatedAt: 'desc',
				},
				where: query
					? {
							OR: [
								{ id: { contains: query } },
								{ firstName: { contains: query } },
								{ secondName: { contains: query } },
								{ thirdName: { contains: query } },
								{ lastName: { contains: query } },
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
		input: TenantModel.schema,
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
	.mutation('save', {
		input: TenantModel.schema,
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
