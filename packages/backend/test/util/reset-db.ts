import prisma from './prisma';

export default async () => {
	await prisma.$transaction([
		prisma.$executeRaw`SET session_replication_role = 'replica';`,
		prisma.user.deleteMany(),
		prisma.role.deleteMany(),
		prisma.organization.deleteMany(),
		prisma.organizationSettings.deleteMany(),
		prisma.tenant.deleteMany(),
		prisma.portfolio.deleteMany(),
		prisma.property.deleteMany(),
		prisma.unit.deleteMany(),
		prisma.lease.deleteMany(),
		prisma.leaseInvoice.deleteMany(),
		prisma.expense.deleteMany(),
		prisma.payout.deleteMany(),
		prisma.maintenanceOrder.deleteMany(),
	]);
};
