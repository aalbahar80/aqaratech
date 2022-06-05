import {
	expenseCats,
	ExpenseGroups,
} from "../../site/src/lib/config/constants.js";
import {
	testPortfolioEmail,
	testPortfolioId,
	testTenantEmail,
	testTenantId,
} from "./generators.js";
import prisma from "./prisma.js";

export async function insertExpenseGroups() {
	console.time("inserting expense groups");
	const data = ExpenseGroups.map((group) => ({
		id: group.idNum,
		en: group.en,
		ar: group.ar,
	}));
	const created = await prisma.expenseGroup.createMany({ data });
	console.log(`${created.count} expense groups inserted`);
	console.timeEnd("inserting expense groups");
}

export async function insertExpenseCategories() {
	console.time("inserting expense categories");
	const data = expenseCats.map((cat, idx) => ({
		id: idx + 1,
		en: cat.en,
		ar: cat.ar,
		groupId: ExpenseGroups.find((g) => g.id === cat.group)?.idNum ?? 1,
	}));
	const created = await prisma.expenseCategory.createMany({ data });
	console.log(`${created.count} expense categories inserted`);
	console.timeEnd("inserting expense categories");
}

export const setupTenant = async () => {
	console.time("creating test tenant");
	await prisma.tenant.create({
		data: {
			id: testTenantId,
			createdAt: new Date(),
			updatedAt: new Date(),
			fullName: "نعيم الشيباني بن عاشور",
			shortName: "نعيم عاشور",
			civilid: "259618795849",
			dob: new Date(),
			phone: "14347945",
			email: testTenantEmail,
			passportNum: "346780239",
			nationality: "CV",
			residencyNum: "534184025",
			residencyEnd: new Date(),
			contactMethod: null,
		},
	});
	console.timeEnd("creating test tenant");
};

export const setupPortfolio = async () => {
	console.time("creating test portfolio");
	await prisma.portfolio.create({
		data: {
			id: testPortfolioId,
			createdAt: new Date(),
			updatedAt: new Date(),
			deactivated: false,
			fullName: "عمر ادريس شقرون",
			shortName: "عمر شقرون",
			civilid: "360506007960",
			phone: "11096260",
			email: testPortfolioEmail,
			dob: new Date(),
		},
	});
	console.timeEnd("creating test portfolio");
};
