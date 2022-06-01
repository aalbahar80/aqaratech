import prismaClient from '$lib/server/prismaClient';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './createRouter';

export const expenseMeta = createRouter()
	.mutation('group:save', {
		input: z.object({
			id: z.string(),
			en: z.string(),
			ar: z.string(),
		}),
		resolve: async ({ input }) => {
			console.log({ input }, 'expenseMeta.ts ~ 17');
			try {
				await prismaClient.expenseGroup.upsert({
					where: { id: input.id ?? undefined },
					create: input,
					update: input,
				});
			} catch (e) {
				if (
					e instanceof Prisma.PrismaClientKnownRequestError &&
					e.code === 'P2002'
				) {
					console.error(e);
					throw new TRPCError({
						code: 'CONFLICT',
						message: 'Duplicate key error',
					});
				}
			}
		},
	})
	.mutation('group:delete', {
		input: z.string(),
		resolve: async ({ input }) => {
			await prismaClient.expenseGroup.delete({
				where: { id: input },
			});
		},
	});
