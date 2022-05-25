import { Expense } from '$lib/models/classes/expense.class';
import prismaClient from '$lib/server/prismaClient';
import { paginationSchema } from '$models/common';
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
					expenseCategoryId: true,
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
		input: Expense.schema,
		resolve: ({ input }) => {
			const { id, ...data } = input;
			return prismaClient.expense.create({
				data: {
					...data,
					...(id ? { id } : {}),
				},
			});
		},
	})
	.mutation('save', {
		input: Expense.schema,
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
