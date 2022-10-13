import { faker } from '@faker-js/faker';
import type { Property, Role } from '@prisma/client';
import { randomUUID } from 'crypto';
import { addDays, addMinutes, addMonths, subDays } from 'date-fns';
import {
	areas,
	coordinates,
	generateExpenseCategoryTree,
	unitTypeOptions,
} from './constants.js';

// consistent id's for testing
export const testPassword = 'cloud12';
export const testOrgEmail = 'org.demo@mailthink.net';
export const testOrgId = 'f79a7bd6-698b-4b56-9e86-4338690a7929';
export const testOrgRoleId = 'e82bdce2-03b6-40aa-9e00-0d95b55b772d';
export const testPortfolioEmail = 'client.dev@mailthink.net';
export const testPortfolioId = '62357de0-03c7-446c-a414-ac6de3ac9bbb';
export const testPortfolioRoleId = '27e60270-172f-4ed2-af48-6d43cb8a526b';
export const testTenantEmail = 'tenant.dev@mailthink.net';
export const testTenantId = 'e6258358-b4f6-4825-9245-0e21c54b557a';
export const testTenantRoleId = '66e2b65c-21cf-4e6f-89c0-710b6766eb37';

export const timespan = 2;
export const createdAt = () => faker.date.past(timespan);
export const updatedAt = () => faker.date.past(timespan);

export const generateId = (): string => randomUUID();

const unitTypeValues = unitTypeOptions
	.filter((u) => u.value)
	.map((u) => u.value);

export const fakeEmail = () => {
	const email = faker.internet.email(undefined, undefined, 'aqaratech.com');
	return email;
};

const fakePerson = () => {
	const gender = Math.random() > 0.5 ? 'male' : 'female';
	const firstName = faker.name.firstName(gender);
	const middleName = faker.name.middleName(gender);
	const lastName = faker.name.lastName(gender);
	const fullName = `${firstName} ${middleName} ${lastName} - FULLNAME`;
	const label = `${firstName} ${lastName}`;
	return { fullName, label };
};

const tree = generateExpenseCategoryTree();

export const fakeUser = () => {
	return {
		id: generateId(),
		createdAt: createdAt(),
		updatedAt: updatedAt(),
		fullName: fakePerson().fullName,
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

export const fakeOrganization = () => {
	// const { fullName, label } = fakePerson();
	return {
		id: generateId(),
		createdAt: createdAt(),
		updatedAt: updatedAt(),
		fullName: faker.company.companyName(),
	};
};

export const fakeOrganizationSettings = (orgId: string) => ({
	id: generateId(),
	organizationId: orgId ?? generateId(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	expenseCategoryTree: tree,
});

export const fakePortfolio = (orgId?: string) => {
	const { fullName, label } = fakePerson();
	return {
		id: generateId(),
		organizationId: orgId ?? generateId(),
		createdAt: createdAt(),
		updatedAt: updatedAt(),
		fullName,
		label: faker.helpers.arrayElement([`${label} - LABEL`, null]),
		civilid: faker.datatype
			.number({ min: 200000000000, max: 399999999999 })
			.toString(),
		phone: faker.phone.number('9#######'),
		dob: faker.date.past(),
	};
};

export const fakeTenant = (orgId?: string) => {
	const { fullName, label } = fakePerson();
	return {
		id: generateId(),
		organizationId: orgId ?? generateId(),
		createdAt: createdAt(),
		updatedAt: updatedAt(),
		fullName,
		label: faker.helpers.arrayElement([`${label} - LABEL`, null]),
		civilid: faker.datatype
			.number({ min: 200000000000, max: 399999999999 })
			.toString(),
		dob: faker.date.past(),
		phone: faker.phone.number('9#######'),
		passportNum: faker.datatype
			.number({ min: 100000000, max: 999999999 })
			.toString(),
		nationality: faker.address.countryCode('alpha-3'),
		residencyNum: faker.datatype
			.number({ min: 100000000, max: 999999999 })
			.toString(),
		residencyEnd: faker.date.future(2),
	};
};

export const fakeUnit = (
	propertyId?: string,
	portfolioId?: string,
	orgaizationId?: string,
) => {
	const type = faker.helpers.arrayElement(unitTypeValues);
	const unitNumber = faker.datatype.number({ min: 1, max: 100 }).toString();
	const title = `${type} ${unitNumber}`;
	return {
		id: generateId(),
		createdAt: createdAt(),
		updatedAt: updatedAt(),
		floor: faker.datatype.number({ min: -2, max: 10 }),
		size: faker.datatype.number({ min: 1, max: 2000 }),
		bed: faker.datatype.number({ min: 1, max: 10 }),
		bath: faker.datatype.number({ min: 1, max: 10 }),
		marketRent: +faker.finance.amount(100, 3000, 0),
		unitNumber,
		type,
		usage: null,
		propertyId: propertyId ?? generateId(),
		portfolioId: portfolioId ?? generateId(),
		organizationId: orgaizationId ?? generateId(),
		label: faker.helpers.arrayElement([`${title} - LABEL`, null]),
	};
};

const getAddress = (property: Pick<Property, 'area' | 'block' | 'number'>) => {
	return [property.area, 'ق', property.block, 'م', property.number]
		.filter(Boolean)
		.join(' ');
};

export const fakeProperty = (portfolioId?: string, organizationId?: string) => {
	const random = Math.floor(Math.random() * coordinates.length);
	const propCoordinates = coordinates[random];

	const area = areas[Math.floor(Math.random() * areas.length)]![1];
	const block = faker.datatype.number({ min: 1, max: 13 }).toString();
	const number = faker.datatype.number({ min: 1, max: 100 }).toString();

	const address = getAddress({ area, block, number });

	return {
		id: generateId(),
		createdAt: createdAt(),
		updatedAt: updatedAt(),
		label: faker.helpers.arrayElement([`${address} - LABEL`, null]),
		area,
		block,
		number,
		street: `شارع ${faker.helpers.arrayElement([
			faker.name.lastName(),
			faker.datatype.number({ min: 1, max: 500 }).toString(),
		])}`,
		avenue: null,
		lat: propCoordinates?.[0] ?? 0,
		long: propCoordinates?.[1] ?? 0,
		parcel: faker.datatype.number({ min: 100, max: 999999 }).toString(),
		paci: faker.datatype.number({ min: 10000000, max: 19999999 }).toString(),
		portfolioId: portfolioId ?? generateId(),
		organizationId: organizationId ?? generateId(),
	};
};

export const fakeLeaseInvoice = (
	leaseId: string,
	amount: number,
	leaseStart: Date,
	count: number,
	portfolioId?: string,
	organizationId?: string,
) => {
	const nextMonth = new Date(
		Date.UTC(leaseStart.getFullYear(), leaseStart.getMonth() + 1, 1),
	);
	const postAt = addMonths(nextMonth, count);
	const isPaid = postAt < new Date() ? Math.random() > 0.15 : false;
	return {
		id: generateId(),
		createdAt: leaseStart,
		updatedAt: leaseStart,
		amount,
		memo: 'RENT',
		postAt,
		dueAt: addDays(postAt, 14),
		isPaid,
		paidAt: isPaid
			? addMinutes(
					postAt,
					faker.datatype.number({ min: 60, max: 60 * 24 * 28 }),
			  )
			: null,
		leaseId,
		portfolioId: portfolioId ?? generateId(),
		organizationId: organizationId ?? generateId(),
	};
};

export const fakeLeaseInvoiceBasic = () => {
	return {
		id: generateId(),
		createdAt: new Date(),
		updatedAt: new Date(),
		amount: faker.datatype.number({ min: 200, max: 2000 }),
		memo: 'RENT',
		postAt: new Date(),
		dueAt: addDays(new Date(), 14),
		isPaid: false,
	};
};

export const fakeLease = (
	tenantId?: string,
	unitId?: string,
	startDate?: Date,
	portfolioId?: string,
	organizationId?: string,
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
		canPay: true,
		tenantId: tenantId ?? generateId(),
		unitId: unitId ?? generateId(),
		portfolioId: portfolioId ?? generateId(),
		organizationId: organizationId ?? generateId(),
		notify: true,
	};
};

export const fakeExpense = () => ({
	id: generateId(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	amount: +faker.finance.amount(10, 250, 0),
	categoryId: faker.helpers.arrayElement(tree.filter((c) => !c.isGroup)).id,
	memo: faker.lorem.sentence(),
	postAt: faker.date.past(timespan),
});

export const fakeMaintenanceOrder = (
	portfolioId?: string,
	organizationId?: string,
) => ({
	id: generateId(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	completedAt: faker.date.future(1),
	title: faker.company.bs(),
	description: faker.lorem.sentences(),
	status: faker.helpers.arrayElement(['pending', 'completed', 'closed']),
	portfolioId: portfolioId ?? generateId(),
	organizationId: organizationId ?? generateId(),
});

export const fakePayout = () => ({
	id: generateId(),
	createdAt: createdAt(),
	updatedAt: updatedAt(),
	amount: +faker.finance.amount(10, 250, 0),
	postAt: faker.date.past(timespan),
	memo: faker.lorem.sentence(),
});
