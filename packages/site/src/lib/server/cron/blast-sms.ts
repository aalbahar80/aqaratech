import prismaClient from '$lib/server/prismaClient';

/**
 * Grabs recent transactions eligible for payment reminders.
 * Returns array of transaction id's.
 */
export const eligibleTrxs = async (duration: number, rangeEnd = new Date()) => {
	const end = new Date(rangeEnd.getTime() - duration * 24 * 60 * 60 * 1000);
	const trxs = await prismaClient.transaction.findMany({
		where: {
			// paused: false, // TODO: add
			isPaid: false,
			postAt: { lte: rangeEnd, gte: end },
			lease: { shouldNotify: true },
		},
	});

	return trxs.map((t) => t.id);
};
