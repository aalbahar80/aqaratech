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
					portfolio: true,
					property: true,
					unit: true,
					category: {
						include: {
							group: true,
						},
					},
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
					category: true,
					portfolio: true,
					property: {
						include: {
							portfolio: true,
						},
					},
					unit: {
						include: {
							property: {
								include: {
									portfolio: true,
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
		resolve: async ({ input }) => {
			const data = await prismaClient.expense.findMany({
				take: input.size,
				skip: input.size * (input.pageIndex - 1),
				orderBy: {
					updatedAt: 'desc',
				},
				select: {
					id: true,
					amount: true,
					postAt: true,
					category: {
						include: {
							group: true,
						},
					},
				},
			});
			const pagination = {
				size: input.size,
				start: input.size * (input.pageIndex - 1) + 1,
				pageIndex: input.pageIndex,
			};

			const formatted = data.map((d) => ({
				...d,
				category: d.category?.en,
				group: d.category?.group?.en,
			}));

			const result = { data: formatted, pagination };
			return result;
		},
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
