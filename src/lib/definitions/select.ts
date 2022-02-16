import { Prisma } from '@prisma/client';

export type ClientData = Prisma.ClientGetPayload<typeof clientData>;
export const clientData = Prisma.validator<Prisma.ClientArgs>()({
	select: {
		id: true,
		firstName: true,
		lastName: true,
		email: true,
		phone: true,
		civilid: true,
		createdAt: true,
		updatedAt: true,
	},
});

export type PropertyData = Prisma.PropertyGetPayload<typeof propertyData>;
export const propertyData = Prisma.validator<Prisma.PropertyArgs>()({
	select: {
		id: true,
		area: true,
		block: true,
		street: true,
		number: true,
		createdAt: true,
		updatedAt: true,
	},
});

export type UnitData = Prisma.UnitGetPayload<typeof unitData>;
export const unitData = Prisma.validator<Prisma.UnitArgs>()({
	select: {
		id: true,
		size: true,
		type: true,
		unitNumber: true,
		bed: true,
		bath: true,
		floor: true,
		createdAt: true,
		updatedAt: true,
	},
});

export type LeaseData = Prisma.LeaseGetPayload<typeof leaseData>;
export const leaseData = Prisma.validator<Prisma.LeaseArgs>()({
	select: {
		id: true,
		startDate: true,
		endDate: true,
		deposit: true,
		monthlyRent: true,
		createdAt: true,
		updatedAt: true,
		unitId: true,
		unit: true,
	},
});

export type TenantData = Prisma.TenantGetPayload<typeof tenantData>;
export const tenantData = Prisma.validator<Prisma.TenantArgs>()({
	select: {
		id: true,
		firstName: true,
		lastName: true,
		email: true,
		phone: true,
		dob: true,
		civilid: true,
		createdAt: true,
		updatedAt: true,
	},
});

export type TenantBrowse = Prisma.TenantGetPayload<typeof tenantBrowse>;
export const tenantBrowse = Prisma.validator<Prisma.TenantArgs>()({
	select: {
		id: true,
		firstName: true,
		lastName: true,
		email: true,
		phone: true,
		dob: true,
		civilid: true,
		createdAt: true,
		updatedAt: true,
		leases: {
			include: {
				transactions: true,
				unit: {
					include: {
						property: true,
					},
				},
			},
		},
	},
});

export type TransactionData = Prisma.TransactionGetPayload<
	typeof transactionData
>;
export const transactionData = Prisma.validator<Prisma.TransactionArgs>()({
	select: {
		id: true,
		isPaid: true,
		amount: true,
		receiptUrl: true,
		memo: true,
		leaseId: true,
		dueDate: true,
		createdAt: true,
		updatedAt: true,
	},
});
