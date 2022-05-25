import prisma from "./prisma.js";

export const cleanupDatabase = async (): Promise<void> => {
	console.warn("deleting database:", process.env.DATABASE_URL);
	console.time("cleanup");
	await prisma.$transaction([
		prisma.$executeRaw`DELETE FROM Expense`,
		prisma.$executeRaw`DELETE FROM ExpenseCategory`,
		prisma.$executeRaw`DELETE FROM ExpenseGroup`,
		prisma.$executeRaw`DELETE FROM MaintenanceOrder`,
		prisma.$executeRaw`DELETE FROM Lease`,
		prisma.$executeRaw`DELETE FROM Unit`,
		prisma.$executeRaw`DELETE FROM Property`,
		prisma.$executeRaw`DELETE FROM Client`,
		prisma.$executeRaw`DELETE FROM Tenant`,
	]);
	console.timeEnd("cleanup");
};
