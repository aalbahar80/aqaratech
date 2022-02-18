import prismaClient from '$lib/server/prismaClient';
// import { falsyToNull, trim } from '$lib/zodTransformers';
import { z } from 'zod';
import * as trpc from '@trpc/server';

export default trpc.router().query('read', {
	input: z.string(),
	resolve: ({ input: id }) =>
		prismaClient.tenant.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
				firstName: true,
				secondName: true,
				lastName: true,
				email: true,
				phone: true,
				dob: true,
				civilid: true,
				createdAt: true,
				updatedAt: true,
				leases: {
					include: {
						transactions: true,
						unit: {
							include: {
								property: true,
							},
						},
					},
				},
			},
		}),
});
