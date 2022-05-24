import {
	expenseCats,
	ExpenseGroups,
} from "../../site/src/lib/config/constants.js";
import prisma from "./prisma.js";

export async function insertExpenseGroups() {
	const data = ExpenseGroups.map((group) => ({
		id: group.id,
		en: group.en,
		ar: group.ar,
	}));
	await prisma.expenseGroup.createMany({ data });
}

export async function insertExpenseCategories() {
	const data = expenseCats.map((cat) => ({
		id: cat.en,
		en: cat.en,
		ar: cat.ar,
		expenseGroupId: cat.group,
	}));
	await prisma.expenseCategory.createMany({ data });
}
