import prismaClient from '$lib/server/prismaClient';

/**
 * Grabs recent transactions eligible for payment reminders.
 */
export const eligibleTrxs = async (date = new Date()) => {
	// end is 7 days before date
	const end = new Date(date.getTime() - 30 * 24 * 60 * 60 * 1000);
	let trxs = await prismaClient.transaction.findMany({
		where: {
			// paused: false, // TODO: add
			isPaid: false,
			postAt: { lte: date, gte: end },
			lease: { shouldNotify: true },
		},
	});

	// Remove in prod
	trxs = trxs.slice(0, 2);
	return trxs.map((t) => t.id);

	// console.log({ trxs }, 'blast-sms.ts ~ 15');
	// console.log({ promises }, 'blast-sms.ts ~ 17');
	// const results = await Promise.all(promises);
	// return results;
};

// send single sms for each
