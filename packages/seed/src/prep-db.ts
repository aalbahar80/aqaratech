import { expenseTypes } from "./constants.js";
import {
	generateId,
	testOrgId,
	// testPortfolioEmail,
	testPortfolioId,
	testTenantEmail,
	testTenantId,
	testUserId,
} from "./generators.js";
import prisma from "./prisma.js";

export async function insertExpenseTypes() {
	console.time("inserting expense groups");
	const created = await prisma.expenseType.createMany({ data: expenseTypes });
	console.log(`${created.count} expense groups inserted`);
	console.timeEnd("inserting expense groups");
}

export const setupTenant = async () => {
	console.time("creating test tenant");
	await prisma.tenant.create({
		data: {
			id: testTenantId,
			organizationId: testOrgId,
			// userId: testUserIdTenant,
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
		},
	});
	console.timeEnd("creating test tenant");
};

export const setupPortfolio = async () => {
	console.time("creating test portfolio");
	await prisma.portfolio.create({
		data: {
			id: testPortfolioId,
			organizationId: testOrgId,
			// userId: testUserIdPortfolio,
			createdAt: new Date(),
			updatedAt: new Date(),
			// deactivated: false,
			fullName: "عمر ادريس شقرون",
			shortName: "عمر شقرون",
			civilid: "360506007960",
			phone: "11096260",
			// email: testPortfolioEmail,
			dob: new Date(),
		},
	});
	console.timeEnd("creating test portfolio");
};

export const setupAdmin = async () => {
	console.time("creating test admin");
	await prisma.role.create({
		data: {
			id: generateId(),
			organizationId: testOrgId,
			userId: testUserId,
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});
	console.timeEnd("creating test admin");
};
