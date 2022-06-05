import prismaClient from '$lib/server/prismaClient';
import { paginationSchema } from '$models/common';
import { Portfolio } from '$models/classes/portfolio.class';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from './createRouter';

export const portfolios = createRouter()
	.query('read', {
		input: z.string(),
		resolve: async ({ input: id }) => {
			const data = await prismaClient.portfolio.findUnique({
				where: {
					id,
				},
				include: {
					properties: true,
				},
			});
			if (data) return data;
			throw new TRPCError({
				code: 'NOT_FOUND',
				message: 'Portfolio not found',
			});
		},
	})
	.query('basic', {
		input: z.string(),
		resolve: async ({ input: id }) => {
			const data = await prismaClient.portfolio.findUnique({
				where: {
					id,
				},
				select: {
					id: true,
					createdAt: true,
					updatedAt: true,
					fullName: true,
					shortName: true,
					phone: true,
					email: true,
					civilid: true,
					dob: true,
				},
			});
			if (data) return data;
			throw new TRPCError({ code: 'NOT_FOUND' });
		},
	})
	.query('list', {
		input: paginationSchema,
		resolve: async ({ input }) => ({
			data: await prismaClient.portfolio.findMany({
				take: input.size,
				skip: input.size * (input.pageIndex - 1),
				orderBy: {
					updatedAt: 'desc',
				},
				select: {
					id: true,
					fullName: true,
					shortName: true,
					phone: true,
					email: true,
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
			prismaClient.portfolio.findMany({
				take: 20,
				orderBy: {
					updatedAt: 'desc',
				},
				select: {
					id: true,
					fullName: true,
					shortName: true,
				},
				where: query
					? {
							OR: [
								{ id: { contains: query } },
								{ fullName: { contains: query } },
								{ shortName: { contains: query } },
								{ email: { contains: query } },
								{ phone: { contains: query } },
								{ civilid: { contains: query } },
							],
					  }
					: {},
			}),
	})
	.query('count', {
		resolve: () => prismaClient.portfolio.count({}),
	})
	.mutation('create', {
		input: Portfolio.schema,
		resolve: ({ input }) => {
			const { id, ...data } = input;
			return prismaClient.portfolio.create({
				data: {
					...data,
					...(id ? { id } : {}),
				},
			});
		},
	})
	.mutation('save', {
		input: Portfolio.schema,
		resolve: ({ input: { id, ...data } }) =>
			id
				? prismaClient.portfolio.update({
						data,
						where: { id },
				  })
				: prismaClient.portfolio.create({
						data,
				  }),
	})
	.mutation('delete', {
		input: z.string(),
		resolve: ({ input: id }) =>
			prismaClient.portfolio.delete({
				where: {
					id,
				},
				select: {
					id: true,
				},
			}),
	});
