import { expenseTypes } from "./constants.js";
import prisma from "./prisma.js";

export async function insertExpenseTypes() {
	console.time("inserting expense groups");
	const created = await prisma.expenseType.createMany({ data: expenseTypes });
	console.log(`${created.count} expense groups inserted`);
	console.timeEnd("inserting expense groups");
}
