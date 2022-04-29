import prismaClient from '$lib/server/prismaClient';
import { paginationSchema } from '$models/common';
import { ExpenseModel } from '$models/interfaces/expense.interface';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './createRouter';

export const expenses = createRouter()
	.query('read', {
		input: z.string(),
		resolve: async ({ input: id }) => {
			const data = await prismaClient.expense.findUnique({
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
			throw new TRPCError({ code: 'NOT_FOUND' });
		},
	})
	.query('basic', {
		input: z.string(),
		resolve: async ({ input: id }) => {
			const data = await prismaClient.expense.findUnique({
				where: {
					id,
				},
				include: {
					client: true,
					property: true,
					unit: true,
					maintenanceOrder: true,
				},
			});
			if (data) return data;
			throw new TRPCError({ code: 'NOT_FOUND' });
		},
	})
	.query('list', {
		input: paginationSchema,
		resolve: async ({ input }) => ({
			data: await prismaClient.expense.findMany({
				take: input.size,
				skip: input.size * (input.pageIndex - 1),
				orderBy: {
					updatedAt: 'desc',
				},
				select: {
					id: true,
					amount: true,
					category: true,
					postAt: true,
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
		resolve: () => prismaClient.expense.count({}),
	})
	.mutation('create', {
		input: ExpenseModel.schema,
		resolve: ({ input: { id, ...data } }) =>
			id
				? prismaClient.expense.update({
						data,
						where: { id },
				  })
				: prismaClient.expense.create({
						data,
				  }),
	})
	.mutation('save', {
		input: ExpenseModel.schema,
		resolve: ({ input: { id, ...data } }) =>
			id
				? prismaClient.expense.update({
						data,
						where: { id },
				  })
				: prismaClient.expense.create({
						data,
				  }),
	})
	.mutation('delete', {
		input: z.string(),
		resolve: ({ input: id }) =>
			prismaClient.expense.delete({
				where: {
					id,
				},
				select: {
					id: true,
				},
			}),
	});
