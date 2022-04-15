import { browser, dev } from '$app/env';
import prismaClient from '$lib/server/prismaClient';
import { falsyToNull, trim } from '$lib/zodTransformers';
import { paginationSchema, withId } from '$models/common';
import { TransactionModel } from '$models/interfaces/transaction.interface';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './createRouter';

let url: string;

// TODO: DRY this up (lib/client/trpc.ts)
if (browser) {
	url = '';
} else if (dev) {
	url = 'http://localhost:3000';
} else if (process.env.VERCEL && process.env.VERCEL_URL) {
	url = `https://${process.env.VERCEL_URL}`;
} else {
	const message =
		'Could not determine url. transactions.ts ~ 19, assuming localhost';
	console.warn(message);
	url = 'http://localhost:3000';
}

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
					dueDate: true,
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
	.query('pay', {
		input: z.string(),
		resolve: async ({ input: id }) =>
			prismaClient.transaction.findUnique({
				where: { id },
				include: { lease: { include: { tenant: true } } },
			}),
	})
	.query('nextReminder', {
		input: z.string(),
		resolve: async ({ input }) => {
			// const res = await fetch(`/transactions/${input}/next-reminder`);
			const res = await fetch(`${url}/transactions/${input}/next-reminder`);
			if (!res.ok) {
				console.error('Unable to get next reminder');
				return null;
			}
			type Data = { reminder: string };
			const data = (await res.json()) as Data;
			return data.reminder;
		},
	})
	.mutation('updatePaid', {
		input: z.object({
			id: z.string().uuid(),
			isPaid: z.boolean(),
			receiptUrl: z.string().transform(trim).transform(falsyToNull).nullable(),
		}),
		resolve: ({ input }) =>
			prismaClient.transaction.update({
				where: { id: input.id },
				data: {
					isPaid: input.isPaid,
					receiptUrl: input.receiptUrl,
				},
			}),
	})
	.mutation('create', {
		input: TransactionModel.schema,
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
	.mutation('save', {
		input: TransactionModel.schema,
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
		input: z.array(withId(TransactionModel.schema)),
		resolve: ({ input }) =>
			prismaClient.transaction.createMany({
				data: input,
			}),
	})
	.mutation('startWF', {
		input: z.array(z.string()),
		resolve: async ({ input }) => {
			await Promise.all(
				input.map(async (id) => {
					// const res = await fetch(`/transactions/${id}/start-notify-wf`);
					const res = await fetch(`${url}/transactions/${id}/start-notify-wf`);
					if (!res.ok) {
						throw new TRPCError({
							code: 'BAD_REQUEST',
							message: 'Error starting workflow',
						});
					}
					return res.json();
				}),
			);
		},
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
