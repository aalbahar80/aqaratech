import { Transaction } from '$lib/models/classes/transaction.class';
import prismaClient from '$lib/server/prismaClient';
import { paginationSchema } from '$models/common';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './createRouter';

export const transactions = createRouter()
	.query('read', {
		input: z.string(),
		resolve: async ({ input: id }) => {
			const data = await prismaClient.transaction.findUnique({
				where: {
					id,
				},
				include: {
					lease: {
						include: {
							tenant: true,
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
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Transaction not found',
			});
		},
	})
	.query('basic', {
		input: z.string(),
		resolve: async ({ input: id }) => {
			const data = await prismaClient.transaction.findUnique({
				where: {
					id,
				},
				include: {
					lease: true,
				},
			});
			if (data) return data;
			throw new TRPCError({ code: 'NOT_FOUND' });
		},
	})
	.query('list', {
		input: paginationSchema,
		resolve: async ({ input }) => ({
			data: await prismaClient.transaction.findMany({
				take: input.size,
				skip: input.size * (input.pageIndex - 1),
				orderBy: {
					updatedAt: 'desc',
				},
				select: {
					id: true,
					isPaid: true,
					amount: true,
					dueAt: true,
					memo: true,
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
		resolve: () => prismaClient.transaction.count({}),
	})
	.mutation('updatePaid', {
		input: z.object({
			id: z.string().uuid(),
			isPaid: z.boolean(),
		}),
		resolve: ({ input: { id, isPaid } }) =>
			prismaClient.transaction.update({
				where: { id: id },
				data: {
					isPaid,
					paidAt: isPaid ? new Date() : null,
				},
			}),
	})
	.mutation('create', {
		input: Transaction.schema,
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
		input: Transaction.schema,
		resolve: ({ input: { id, ...data } }) =>
			id
				? prismaClient.transaction.update({
						data,
						where: { id },
				  })
				: prismaClient.transaction.create({
						data,
				  }),
	})
	.mutation('saveMany', {
		input: z.array(Transaction.schema),
		resolve: ({ input }) =>
			prismaClient.transaction.createMany({
				data: input,
			}),
	})
	.mutation('delete', {
		input: z.string(),
		resolve: ({ input: id }) =>
			prismaClient.transaction.delete({
				where: {
					id,
				},
				select: {
					id: true,
				},
			}),
	});
