import { Transaction } from '$lib/models/classes/transaction.class';
import prismaClient from '$lib/server/prismaClient';
import { falsyToNull, trim } from '$lib/zodTransformers';
import { paginationSchema, withId } from '$models/common';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './createRouter';

let url: string;

// TODO: DRY this up (lib/client/trpc.ts)
if (process.env.VERCEL) {
	// url = `https://${process.env.VERCEL_URL}`;
	url = `https://dev.letand.be`;
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
	.query('nextReminder', {
		input: z.string(),
		resolve: async ({ input }) => {
			// const res = await fetch(`/transactions/${input}/next-reminder`);
			if (
				process.env.VERCEL_GIT_COMMIT_REF === 'stage' ||
				process.env.VERCEL_ENV === 'production'
			) {
				// TODO: REMOVE IN PRODUCTION
				return new Date().toString();
			}
			const res = await fetch(`${url}/transactions/${input}/next-reminder`);
			if (!res.ok) {
				console.error('Unable to get next reminder');
				return null;
			}
			type Data = { reminder: string };
			const data = (await res.json()) as Data;
			console.log({ data }, 'transactions.ts ~ 98');
			return data.reminder;
		},
	})
	.mutation('updatePaid', {
		input: z.object({
			id: z.string().uuid(),
			isPaid: z.boolean(),
			mfPaymentId: z.string().optional().transform(trim).transform(falsyToNull),
		}),
		resolve: ({ input: { id, isPaid, mfPaymentId } }) =>
			prismaClient.transaction.update({
				where: { id: id },
				data: {
					isPaid,
					paidAt: isPaid ? new Date() : null,
					mfPaymentId: mfPaymentId || null,
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
		input: z.array(withId(Transaction.schema)),
		resolve: ({ input }) =>
			prismaClient.transaction.createMany({
				data: input,
			}),
	})
	.mutation('startWF', {
		input: z.array(z.string()),
		resolve: async ({ input }) => {
			console.log({ url }, 'transactions.ts ~ 152');
			await Promise.all(
				input.map(async (id) => {
					const res = await fetch(`${url}/transactions/${id}/start-notify-wf`);
					if (!res.ok) {
						throw new TRPCError({
							code: 'BAD_REQUEST',
							message: 'Error starting workflow from TRPC',
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
