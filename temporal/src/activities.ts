import type { Lease, PrismaClient as PrismaClientType } from '@prisma/client';
import { format, parseISO } from 'date-fns';

export const createActivities = (prismaClient: PrismaClientType) => ({
	async generateTransaction(lease: Lease, dueDate: string) {
		const memo = 'Rent for: ' + format(parseISO(dueDate), 'MMMM yyyy');
		console.log(`Generating trx for ${memo}: `, lease, dueDate);
		const trx = await prismaClient.transaction.create({
			data: {
				amount: lease.monthlyRent,
				leaseId: lease.id,
				dueDate,
				memo,
			},
		});
		console.log(`Generated trx for ${memo}: `, trx);
		return trx;
	},
	async getLease(leaseId: string): Promise<Lease | null> {
		console.log(`Getting lease ${leaseId}...`);
		const lease = await prismaClient.lease.findFirst({
			where: {
				id: leaseId,
			},
		});
		console.log(`Got lease ${leaseId}: `, lease);
		return lease;
	},
	async notify(transactionId: string): Promise<void> {
		console.log(`Notifying ${transactionId}...`);
		console.log(`Notified ${transactionId}: `);
	},
});
