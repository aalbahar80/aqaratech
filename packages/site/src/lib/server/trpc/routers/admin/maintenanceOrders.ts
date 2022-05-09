import { MaintenanceOrder } from '$lib/models/classes/maintenanceOrder.class.js';
import prismaClient from '$lib/server/prismaClient.js';
import { paginationSchema } from '$models/common.js';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './createRouter.js';

export const maintenanceOrders = createRouter()
	.query('read', {
		input: z.string(),
		resolve: async ({ input: id }) => {
			const data = await prismaClient.maintenanceOrder.findUnique({
				where: {
					id,
				},
				include: {
					client: true,
					property: true,
					unit: true,
				},
			});
			if (data) return data;
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Maintenance Order not found',
			});
		},
	})
	.query('basic', {
		input: z.string(),
		resolve: async ({ input: id }) => {
			const data = await prismaClient.maintenanceOrder.findUnique({
				where: {
					id,
				},
				include: {
					client: true,
					property: {
						include: {
							client: true,
						},
					},
					unit: {
						include: {
							property: {
								include: {
									client: true,
								},
							},
						},
					},
					tenant: true,
				},
			});
			if (data) return data;
			throw new TRPCError({ code: 'NOT_FOUND' });
		},
	})
	.query('list', {
		input: paginationSchema,
		resolve: async ({ input }) => ({
			data: await prismaClient.maintenanceOrder.findMany({
				take: input.size,
				skip: input.size * (input.pageIndex - 1),
				orderBy: {
					updatedAt: 'desc',
				},
				select: {
					id: true,
					title: true,
					status: true,
					completedAt: true,
				},
			}),
			pagination: {
				size: input.size,
				start: input.size * (input.pageIndex - 1) + 1,
				pageIndex: input.pageIndex,
			},
		}),
	})
	.query('count', {
		resolve: () => prismaClient.maintenanceOrder.count({}),
	})
	.mutation('create', {
		input: MaintenanceOrder.schema,
		resolve: ({ input }) => {
			const { id, ...data } = input;
			return prismaClient.maintenanceOrder.create({
				data: {
					...data,
					...(id ? { id } : {}),
				},
			});
		},
	})
	.mutation('save', {
		input: MaintenanceOrder.schema,
		resolve: ({ input: { id, ...data } }) =>
			id
				? prismaClient.maintenanceOrder.update({
						data,
						where: { id },
				  })
				: prismaClient.maintenanceOrder.create({
						data,
				  }),
	})
	.mutation('delete', {
		input: z.string(),
		resolve: ({ input: id }) =>
			prismaClient.maintenanceOrder.delete({
				where: {
					id,
				},
				select: {
					id: true,
				},
			}),
	});
