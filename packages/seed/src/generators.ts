import { faker } from "@faker-js/faker";
import { addDays, addMinutes, addMonths, subDays } from "date-fns";
import {
	areas,
	coordinates,
	expenseCats,
	unitTypeOptions,
} from "../../site/src/lib/config/constants.js";

faker.setLocale("ar");

// consistent id's for testing
export const testClientId = "c0183a5d-2875-488b-b86f-e1c5628262df";
export const testClientEmail = "client.dev@mailthink.net";
export const testClientPassword = "test12";
export const testTenantId = "3dcef1c0-aae7-4766-968e-ad31b443bcc9";
export const testTenantEmail = "tenant.dev@mailthink.net";
export const testTenantPassword = "test12";

export const timespan = 3;
const createdAt = () => faker.date.past(timespan);
const updatedAt = () => faker.date.past(timespan);

const unitTypeValues = unitTypeOptions
	.filter((u) => u.value)
	.map((u) => u.value);

export const fakeEmail = () => {
	faker.setLocale("en");
	const email = faker.internet.email(undefined, undefined, "aqaratech.com");
	faker.setLocale("ar");
	return email;
};

export const fakeClient = () => ({
	id: faker.datatype.uuid(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	firstName: faker.name.firstName(),
	lastName: faker.name.lastName(),
	secondName: faker.name.lastName(),
	civilid: faker.datatype
		.number({ min: 200000000000, max: 399999999999 })
		.toString(),
	email: fakeEmail(),
	// phone: faker.phone.phoneNumber("1#######"),
	phone: "99212976",
	dob: faker.date.past(),
});

export const fakeTenant = () => ({
	id: faker.datatype.uuid(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	firstName: faker.name.firstName(),
	lastName: faker.name.lastName(),
	secondName: faker.name.lastName(),
	civilid: faker.datatype
		.number({ min: 200000000000, max: 399999999999 })
		.toString(),
	email: fakeEmail(),
	dob: faker.date.past(),
	// phone: faker.phone.phoneNumber("1#######"),
	phone: "99212976",
	passportNum: faker.datatype
		.number({ min: 100000000, max: 999999999 })
		.toString(),
	nationality: faker.address.countryCode(),
	residencyNum: faker.datatype
		.number({ min: 100000000, max: 999999999 })
		.toString(),
	residencyEnd: faker.date.future(2),
});

export const fakeUnit = (propertyId?: string) => ({
	id: faker.datatype.uuid(),
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
	propertyId: propertyId ?? faker.datatype.uuid(),
});

export const fakeProperty = (clientId?: string) => {
	const random = Math.floor(Math.random() * coordinates.length);
	const propCoordinates = coordinates[random];
	return {
		id: faker.datatype.uuid(),
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
		clientId: clientId ?? faker.datatype.uuid(),
	};
};

export const fakeTransaction = (
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
		id: faker.datatype.uuid(),
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

export const fakeTransactionBasic = () => {
	return {
		id: faker.datatype.uuid(),
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
		id: faker.datatype.uuid(),
		createdAt: start,
		updatedAt: start,
		start,
		end,
		deposit: +faker.finance.amount(100, 3000, 0),
		monthlyRent: +faker.finance.amount(1500, 3000, 0),
		license: faker.company.bs(),
		deactivated: false,
		tenantId: tenantId ?? faker.datatype.uuid(),
		unitId: unitId ?? faker.datatype.uuid(),
		notify: true,
	};
};

export const fakeExpense = () => ({
	id: faker.datatype.uuid(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	amount: +faker.finance.amount(10, 250, 0),
	expenseCategoryId: faker.helpers.arrayElement(expenseCats.map((e) => e.en)),
	memo: faker.lorem.sentences(),
	postAt: faker.date.past(timespan),
});

export const fakeMaintenanceOrder = () => ({
	id: faker.datatype.uuid(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	completedAt: faker.date.future(1),
	title: faker.company.bs(),
	description: faker.lorem.sentences(),
	status: faker.helpers.arrayElement(["pending", "completed", "closed"]),
});
