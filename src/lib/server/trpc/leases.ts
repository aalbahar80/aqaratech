import { paginationSchema } from '$lib/definitions/common';
import { schema } from '$lib/definitions/lease';
import prismaClient from '$lib/server/prismaClient';
import * as trpc from '@trpc/server';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export default trpc
	.router()
	.query('read', {
		input: z.string(),
		resolve: async ({ input: id }) => {
			const data = await prismaClient.lease.findUnique({
				where: {
					id,
				},
				include: {
					transactions: {
						orderBy: {
							dueDate: 'asc',
						},
					},
					tenant: {
						select: {
							id: true,
							firstName: true,
							lastName: true,
							secondName: true,
							thirdName: true,
							civilid: true,
							phone: true,
							dob: true,
							email: true,
							passportNum: true,
							nationality: true,
							residencyEnd: true,
							residencyNum: true,
						},
					},
					unit: {
						select: {
							id: true,
							unitNumber: true,
							type: true,
							property: {
								select: {
									id: true,
									area: true,
									block: true,
									street: true,
									number: true,
									avenue: true,
									client: {
										select: {
											id: true,
										},
									},
								},
							},
						},
					},
				},
			});
			if (data) return data;
			throw new TRPCError({ code: 'NOT_FOUND', message: 'Lease not found' });
		},
	})
	.query('basic', {
		input: z.string(),
		resolve: async ({ input: id }) => {
			const data = await prismaClient.lease.findUnique({
				where: {
					id,
				},
				select: {
					id: true,
					monthlyRent: true,
					deposit: true,
					start: true,
					end: true,
					active: true,
					shouldNotify: true,
					createdAt: true,
					updatedAt: true,
					tenantId: true,
					tenant: {
						select: {
							id: true,
							firstName: true,
							lastName: true,
						},
					},
					unitId: true,
					unit: {
						select: {
							id: true,
							unitNumber: true,
						},
					},
				},
			});
			if (data) return data;
			throw new TRPCError({ code: 'NOT_FOUND', message: 'Lease not found' });
		},
	})
	.query('list', {
		input: paginationSchema.extend({
			status: z
				.object({
					current: z.boolean().default(true),
					expired: z.boolean().default(true),
					upcoming: z.boolean().default(true),
				})
				.nullish()
				.default({
					current: true,
					expired: true,
					upcoming: true,
				}),
			sortBy: z
				.object({
					key: z.enum(['createdAt', 'end']),
					order: z.enum(['asc', 'desc']),
				})
				.default({ key: 'createdAt', order: 'desc' }),
		}),
		resolve: async ({ input }) => {
			const filters = {
				current: {
					AND: [
						{
							start: {
								lte: new Date(),
							},
						},
						{
							end: {
								gte: new Date(),
							},
						},
					],
				},
				expired: {
					end: {
						lt: new Date(),
					},
				},
				upcoming: {
					start: {
						gt: new Date(),
					},
				},
			};

			return {
				data: await prismaClient.lease.findMany({
					take: input.size,
					skip: input.size * (input.pageIndex - 1),
					orderBy: {
						[input.sortBy.key]: input.sortBy.order,
					},
					where: {
						OR: [
							input.status?.upcoming ? filters.upcoming : {},
							input.status?.current ? filters.current : {},
							input.status?.expired ? filters.expired : {},
						],
					},
					select: {
						id: true,
						start: true,
						end: true,
						monthlyRent: true,
						tenant: true,
						unit: {
							include: {
								property: true,
							},
						},
					},
				}),
				pagination: {
					size: input.size,
					start: input.size * (input.pageIndex - 1) + 1,
					pageIndex: input.pageIndex,
				},
			};
		},
	})
	.query('search', {
		input: z.object({
			query: z.string().optional(),
		}),
		resolve: ({ input: { query } }) =>
			prismaClient.lease.findMany({
				take: 5,
				orderBy: {
					updatedAt: 'desc',
				},
				select: {
					id: true,
					start: true,
					end: true,
					tenant: {
						select: {
							firstName: true,
							lastName: true,
						},
					},
					unit: {
						select: {
							unitNumber: true,
							property: {
								select: {
									area: true,
								},
							},
						},
					},
				},
				where: query
					? {
							OR: [
								{ id: { contains: query } },
								{ license: { contains: query } },
								{ tenant: { firstName: { contains: query } } },
								{ tenant: { lastName: { contains: query } } },
							],
					  }
					: {},
			}),
	})
	.query('count', {
		resolve: () => prismaClient.lease.count({}),
	})
	.mutation('save', {
		input: schema,
		resolve: ({ input: { id, ...data } }) =>
			id
				? prismaClient.lease.update({
						data,
						where: { id },
				  })
				: prismaClient.lease.create({
						data,
				  }),
	})
	.mutation('delete', {
		input: z.string(),
		resolve: ({ input: id }) =>
			prismaClient.lease.delete({
				where: {
					id,
				},
			}),
	});
