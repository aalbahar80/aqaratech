import type { Customer } from './types';
import type { PrismaClient as PrismaClientType } from '@prisma/client';

export const createActivities = (prismaClient: PrismaClientType) => ({
	async sendWelcomeEmail(customer: Customer): Promise<any> {
		console.log(`Sending welcome email to ${customer.email}`);
	},
	async sendCancellationEmailDuringTrialPeriod(
		customer: Customer,
	): Promise<any> {
		console.log(`Sending trial cancellation email to ${customer.email}`);
	},
	async chargeCustomerForBillingPeriod(
		customer: Customer,
		chargeAmount: number,
	): Promise<any> {
		console.log(
			`Charging ${customer.email} amount ${chargeAmount} for their billing period`,
		);
	},
	async sendCancellationEmailDuringActiveSubscription(
		customer: Customer,
	): Promise<any> {
		console.log(
			`Sending active subscriber cancellation email to ${customer.email}`,
		);
	},
	async sendSubscriptionOverEmail(customer: Customer): Promise<any> {
		console.log(`Sending subscription over email to ${customer.email}`);
	},

	async greet(msg: string): Promise<string> {
		// const name = await db.get('name'); // simulate read from db
		const client = await prismaClient.client.findFirst({});
		const name = client?.firstName;
    console.log(name)
		return `${msg}: ${name}`;
	},
	async greet_es(mensaje: string): Promise<string> {
		const client = await prismaClient.client.findFirst({});
		const name = client?.firstName;
    console.log(name)
		return `${mensaje}: ${name}`;
	},
});
