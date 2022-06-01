import {
	expenseCats,
	ExpenseGroups,
} from "../../site/src/lib/config/constants.js";
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
			id: "3dcef1c0-aae7-4766-968e-ad31b443bcc9",
			createdAt: new Date(),
			updatedAt: new Date(),
			firstName: "نعيم",
			secondName: "الشيباني",
			thirdName: null,
			lastName: "بن عاشور",
			civilid: "259618795849",
			dob: new Date(),
			phone: "14347945",
			email: "tenant.dev@mailthink.net",
			passportNum: "346780239",
			nationality: "CV",
			residencyNum: "534184025",
			residencyEnd: new Date(),
			contactMethod: null,
		},
	});
	console.timeEnd("creating test tenant");
};

export const setupClient = async () => {
	console.time("creating test client");
	await prisma.client.create({
		data: {
			id: "c0183a5d-2875-488b-b86f-e1c5628262df",
			createdAt: new Date(),
			updatedAt: new Date(),
			deactivated: false,
			firstName: "عمر",
			secondName: "ادريس",
			thirdName: null,
			lastName: "شقرون",
			civilid: "360506007960",
			phone: "11096260",
			email: "client.dev@mailthink.net",
			dob: new Date(),
		},
	});
	console.timeEnd("creating test client");
};
