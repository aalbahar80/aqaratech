import { faker } from "@faker-js/faker";
import { Role } from "@prisma/client";
import { addDays, addMinutes, addMonths, subDays } from "date-fns";
import { customAlphabet } from "nanoid";
import {
	areas,
	coordinates,
	expenseTypes,
	unitTypeOptions,
} from "./constants.js";

// consistent id's for testing
export const testPassword = "test12";
export const testOrgEmail = "org.demo@mailthink.net";
export const testOrgId = "hdmp5pje1a7o";
export const testPortfolioEmail = "client.dev@mailthink.net";
export const testPortfolioId = "portfolio-1a";
export const testTenantEmail = "tenant.dev@mailthink.net";
export const testTenantId = "tenant-1aaaa";

export const timespan = 2;
export const createdAt = () => faker.date.past(timespan);
export const updatedAt = () => faker.date.past(timespan);

export const generateId = (): string =>
	customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 12)();

const unitTypeValues = unitTypeOptions
	.filter((u) => u.value)
	.map((u) => u.value);

export const fakeEmail = () => {
	const email = faker.internet.email(undefined, undefined, "aqaratech.com");
	return email;
};

export const fakeUser = () => {
	const fullName = faker.name.firstName() + " " + faker.name.lastName();
	return {
		id: generateId(),
		createdAt: createdAt(),
		updatedAt: updatedAt(),
		fullName,
		email: fakeEmail(),
	};
};

export const fakeRole = ({
	userId,
	orgId,
}: {
	userId: string;
	orgId: string;
}): Partial<Role> => ({
	id: generateId(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	organizationId: orgId,
	// portfolioId: null,
	// tenantId: null,
	// permissions: null,
	userId,
});

export const fakeOrganization = () => ({
	id: generateId(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	fullName: faker.company.companyName(),
});

export const fakeOrganizationSettings = (orgId: string) => ({
	id: generateId(),
	organizationId: orgId ?? generateId(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	expenseCategoryTree: expenseTypes,
});

export const fakePortfolio = (orgId?: string) => {
	const fullName = faker.name.firstName() + " " + faker.name.lastName();
	return {
		id: generateId(),
		organizationId: orgId ?? generateId(),
		createdAt: createdAt(),
		updatedAt: updatedAt(),
		fullName,
		label: fullName,
		civilid: faker.datatype
			.number({ min: 200000000000, max: 399999999999 })
			.toString(),
		phone: faker.phone.number("9#######"),
		dob: faker.date.past(),
	};
};

export const fakeTenant = (orgId?: string) => {
	const fullName = faker.name.firstName() + " " + faker.name.lastName();
	return {
		id: generateId(),
		organizationId: orgId ?? generateId(),
		createdAt: createdAt(),
		updatedAt: updatedAt(),
		fullName,
		label: fullName,
		civilid: faker.datatype
			.number({ min: 200000000000, max: 399999999999 })
			.toString(),
		dob: faker.date.past(),
		phone: faker.phone.number("9#######"),
		passportNum: faker.datatype
			.number({ min: 100000000, max: 999999999 })
			.toString(),
		nationality: faker.address.countryCode("alpha-3"),
		residencyNum: faker.datatype
			.number({ min: 100000000, max: 999999999 })
			.toString(),
		residencyEnd: faker.date.future(2),
	};
};

export const fakeUnit = (propertyId?: string) => ({
	id: generateId(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	floor: faker.datatype.number({ min: -2, max: 10 }),
	size: faker.datatype.number({ min: 1, max: 2000 }),
	bed: faker.datatype.number({ min: 1, max: 10 }),
	bath: faker.datatype.number({ min: 1, max: 10 }),
	marketRent: +faker.finance.amount(100, 3000, 0),
	unitNumber: faker.datatype.number({ min: 1, max: 100 }).toString(),
	type: faker.helpers.arrayElement(unitTypeValues),
	usage: null,
	propertyId: propertyId ?? generateId(),
});

export const fakeProperty = (portfolioId?: string) => {
	const random = Math.floor(Math.random() * coordinates.length);
	const propCoordinates = coordinates[random];
	return {
		id: generateId(),
		createdAt: createdAt(),
		updatedAt: updatedAt(),
		area: areas[Math.floor(Math.random() * areas.length)]![1],
		block: faker.datatype.number({ min: 1, max: 13 }).toString(),
		street: `شارع ${faker.helpers.arrayElement([
			faker.name.lastName(),
			faker.datatype.number({ min: 1, max: 500 }).toString(),
		])}`,
		avenue: null,
		number: faker.datatype.number({ min: 1, max: 100 }).toString(),
		lat: propCoordinates?.[0] ?? 0,
		long: propCoordinates?.[1] ?? 0,
		parcel: faker.datatype.number({ min: 100, max: 999999 }).toString(),
		paci: faker.datatype.number({ min: 10000000, max: 19999999 }).toString(),
		portfolioId: portfolioId ?? generateId(),
	};
};

export const fakeLeaseInvoice = (
	leaseId: string,
	amount: number,
	leaseStart: Date,
	count: number
) => {
	const nextMonth = new Date(
		Date.UTC(leaseStart.getFullYear(), leaseStart.getMonth() + 1, 1)
	);
	const postAt = addMonths(nextMonth, count);
	const isPaid = postAt < new Date() ? Math.random() > 0.15 : false;
	return {
		id: generateId(),
		createdAt: leaseStart,
		updatedAt: leaseStart,
		amount,
		memo: "RENT",
		postAt,
		dueAt: addDays(postAt, 14),
		isPaid,
		paidAt: isPaid
			? addMinutes(
					postAt,
					faker.datatype.number({ min: 60, max: 60 * 24 * 28 })
			  )
			: null,
		leaseId,
	};
};

export const fakeLeaseInvoiceBasic = () => {
	return {
		id: generateId(),
		createdAt: new Date(),
		updatedAt: new Date(),
		amount: faker.datatype.number({ min: 200, max: 2000 }),
		memo: "RENT",
		postAt: new Date(),
		dueAt: addDays(new Date(), 14),
		isPaid: false,
	};
};

export const fakeLease = (
	tenantId?: string,
	unitId?: string,
	startDate?: Date
) => {
	const start = startDate ?? faker.date.past(timespan);
	const end = subDays(addMonths(start, 12), 1);
	return {
		id: generateId(),
		createdAt: start,
		updatedAt: start,
		start,
		end,
		deposit: +faker.finance.amount(100, 3000, 0),
		monthlyRent: +faker.finance.amount(1500, 3000, 0),
		license: faker.company.bs(),
		deactivated: false,
		tenantId: tenantId ?? generateId(),
		unitId: unitId ?? generateId(),
		notify: true,
	};
};

export const fakeExpense = () => ({
	id: generateId(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	amount: +faker.finance.amount(10, 250, 0),
	categoryId: Math.floor(Math.random() * expenseTypes.length) + 1,
	memo: faker.lorem.sentences(),
	postAt: faker.date.past(timespan),
});

export const fakeMaintenanceOrder = () => ({
	id: generateId(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	completedAt: faker.date.future(1),
	title: faker.company.bs(),
	description: faker.lorem.sentences(),
	status: faker.helpers.arrayElement(["pending", "completed", "closed"]),
});
