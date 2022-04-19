import type { Lease, PrismaClient as PrismaClientType } from "@prisma/client";
import { format, parseISO } from "date-fns";

export const createActivities = (prismaClient: PrismaClientType) => ({
	async generateTransaction(lease: Lease, dueAt: string) {
		const memo = "Rent for: " + format(parseISO(dueAt), "MMMM yyyy");
		console.log(`Generating trx for ${memo}: `, lease.id, dueAt);
		const trx = await prismaClient.transaction.create({
			data: {
				amount: lease.monthlyRent,
				leaseId: lease.id,
				dueAt,
				postAt: dueAt,
				memo,
			},
			include: { lease: true },
		});
		console.log(`Generated trx for ${memo}: `, trx.id);
		return trx;
	},
	async getLease(id: string) {
		console.log(`Getting lease ${id}...`);
		const lease = await prismaClient.lease.findUnique({
			where: { id },
		});
		console.log(`Got lease ${id}: `);
		return lease;
	},
	async notify(transactionId: string): Promise<void> {
		console.log(`Notifying ${transactionId}...`);
		console.log(`Notified ${transactionId}: `);
	},
	async getTrx(id: string) {
		console.log(`Getting trx ${id}...`);
		const trx = await prismaClient.transaction.findUnique({
			where: { id },
			include: {
				lease: {
					include: { tenant: true },
				},
			},
		});
		if (!trx) throw new Error("Trx not found");
		// console.log(`Got trx ${id}: `, trx);
		return trx;
	},
	async setReminderAt(trxId: string, reminderAt: string) {
		console.log(`Setting reminder at ${reminderAt} for ${trxId}...`);
		const trx = await prismaClient.transaction.update({
			where: { id: trxId },
			data: {
				reminderAt,
			},
		});
		console.log(`Set reminder at ${reminderAt} for ${trxId}: `, trx);
		return trx;
	},
});
