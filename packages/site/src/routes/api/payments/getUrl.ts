import { zodnanoid } from '$lib/models/schemas/nano-id.schema';
import prismaClient from '$lib/server/prismaClient';
import { getMFUrl } from '$lib/services/myfatoorah';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const ID = zodnanoid;
	const raw = url.searchParams.get('id');
	if (!raw) {
		return {
			status: 400,
			body: {
				errorMsg: 'No transaction id provided',
			},
		};
	}
	try {
		const input = ID.safeParse(raw);
		if (!input.success) {
			console.error(input.error);
			return {
				status: 400,
				body: {
					error: JSON.parse(input.error.toString()),
					errorMsg: 'Invalid transaction id',
				},
			};
		}
		const trxId = input.data;

		const trx = await prismaClient.transaction.findUnique({
			where: { id: trxId },
			select: {
				id: true,
				postAt: true,
				amount: true,
				isPaid: true,
				lease: {
					select: {
						canPay: true,
						tenant: {
							select: {
								fullName: true,
								label: true,
								email: true,
								phone: true,
							},
						},
					},
				},
			},
		});

		if (!trx) {
			return {
				status: 404,
				body: {
					errorMsg: 'Transaction not found',
				},
			};
		}

		if (trx.isPaid) {
			return {
				status: 400,
				body: {
					errorMsg: 'Transaction already paid',
				},
			};
		}

		if (trx.postAt > new Date()) {
			return {
				status: 400,
				body: {
					errorMsg: 'Transaction not yet posted',
				},
			};
		}

		if (!trx.lease.canPay) {
			return {
				status: 400,
				body: {
					errorMsg: 'Lease not active',
				},
			};
		}

		const paymentUrl = await getMFUrl(trx);
		return {
			status: 200,
			body: {
				paymentUrl,
			},
		};
	} catch (err) {
		console.error(err);
		return {
			status: 500,
			body: { errorMsg: 'Unable to get payment url from myfatoorah' },
		};
	}
};
