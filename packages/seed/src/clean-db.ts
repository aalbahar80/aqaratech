import prisma from "./prisma.js";

export const cleanupDatabase = async (): Promise<void> => {
	if (await isProdBranch()) {
		return;
	}
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
		prisma.$executeRaw`DELETE FROM Portfolio`,
		prisma.$executeRaw`DELETE FROM Tenant`,
	]);
	console.timeEnd("cleanup");
};

/**
 * @returns true if the current branch is a production branch.
 * Useful to run before any destructive operations.
 */
export const isProdBranch = async () => {
	try {
		console.log("Checking if database branch is in production");
		console.log("DATABASE_URL: ", process.env.DATABASE_URL);

		await prisma.$executeRaw`DROP TABLE IF EXISTS MyEscapeHatch`;
		await prisma.$executeRaw`CREATE TABLE MyEscapeHatch(dummy varchar(255))`;
		await prisma.$executeRaw`DROP TABLE MyEscapeHatch`;

		console.log("Branch is not production");
		return false;
	} catch (e) {
		console.warn("Database is a production branch! Aborting...");
		console.error(e);
		return true;
	}
};
