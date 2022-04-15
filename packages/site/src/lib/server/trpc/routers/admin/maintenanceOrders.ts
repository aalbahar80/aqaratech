import prismaClient from '$lib/server/prismaClient';
import { paginationSchema } from '$models/common';
import { MaintenanceOrderModel } from '$models/interfaces/maintenanceOrder.interface';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from '.';

export const maintenanceOrders = createRouter()
	.query('read', {
		input: z.string(),
		resolve: async ({ input: id }) => {
			const data = await prismaClient.maintenanceOrder.findUnique({
				where: {
					id,
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
		input: MaintenanceOrderModel.schema,
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
	.mutation('save', {
		input: MaintenanceOrderModel.schema,
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
