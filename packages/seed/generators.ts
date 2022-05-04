import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";
import { addDays, addMinutes, addMonths, subDays } from "date-fns";
import {
	areas,
	coordinates,
	expenseCats,
	unitTypeOptions,
} from "../site/src/lib/config/constants.js";

faker.setLocale("ar");

// consistent id's for testing
export const testClientId = "c0183a5d-2875-488b-b86f-e1c5628262df";
export const testTenantId = "3dcef1c0-aae7-4766-968e-ad31b443bcc9";

export const timespan = 4;
const createdAt = () => faker.date.past(timespan);
const updatedAt = () => faker.date.past(timespan);

const unitTypeValues = unitTypeOptions
	.filter((u) => u.value)
	.map((u) => u.value);

export const fakeEmail = () => {
	faker.setLocale("en");
	const email = faker.internet.email();
	faker.setLocale("ar");
	return email;
};

export const fakeClient = () => ({
	id: randomUUID(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	firstName: faker.name.firstName(),
	lastName: faker.name.lastName(),
	secondName: faker.name.lastName(),
	civilid: faker.datatype
		.number({ min: 200000000000, max: 399999999999 })
		.toString(),
	email: fakeEmail(),
	phone: faker.phone.phoneNumber("1#######"),
	dob: faker.date.past(),
});

export const fakeTenant = () => ({
	id: randomUUID(),
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
	phone: faker.phone.phoneNumber("1#######"),
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
	id: randomUUID(),
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
	propertyId: propertyId ?? randomUUID(),
});

export const fakeProperty = (clientId?: string) => {
	const random = Math.floor(Math.random() * coordinates.length);
	const propCoordinates = coordinates[random];
	return {
		id: randomUUID(),
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
		clientId: clientId ?? randomUUID(),
	};
};

export const fakeTransaction = (
	leaseId: string,
	amount: number,
	leaseStart: Date,
	count: number
) => {
	const nextMonth = new Date(
		leaseStart.getFullYear(),
		leaseStart.getMonth() + 1,
		1
	);
	const postAt = addMonths(nextMonth, count);
	const isPaid = postAt < new Date() ? Math.random() > 0.15 : false;
	return {
		id: randomUUID(),
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

export const fakeLease = (
	tenantId?: string,
	unitId?: string,
	startDate?: Date
) => {
	const start = startDate ?? faker.date.past(timespan);
	const end = subDays(addMonths(start, 12), 1);
	return {
		id: randomUUID(),
		createdAt: start,
		updatedAt: start,
		start,
		end,
		deposit: +faker.finance.amount(100, 3000, 0),
		monthlyRent: +faker.finance.amount(100, 3000, 0),
		license: faker.company.bs(),
		active: true,
		tenantId: tenantId ?? randomUUID(),
		unitId: unitId ?? randomUUID(),
		shouldNotify: true,
	};
};

export const fakeExpense = () => ({
	id: randomUUID(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	amount: +faker.finance.amount(100, 3000, 0),
	category: faker.helpers.arrayElement(expenseCats.map((e) => e.en)),
	memo: faker.lorem.sentences(),
	postAt: faker.date.past(timespan),
});

export const fakeMaintenanceOrder = () => ({
	id: randomUUID(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	completedAt: faker.date.future(1),
	title: faker.company.bs(),
	description: faker.lorem.sentences(),
	status: faker.helpers.arrayElement(["pending", "completed", "closed"]),
});
