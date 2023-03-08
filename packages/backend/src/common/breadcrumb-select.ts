import type { Prisma } from '@prisma/client';

const lease = {
	select: {
		id: true,
		tenant: {
			select: {
				id: true,
				label: true,
				fullName: true,
			},
		},
		unit: {
			select: {
				id: true,
				label: true,
				propertyId: true,
				type: true,
				unitNumber: true,
				property: {
					select: {
						id: true,
						label: true,
						area: true,
						block: true,
						number: true,
						portfolio: { select: { id: true, label: true, fullName: true } },
					},
				},
			},
		},
	} satisfies Prisma.LeaseSelect,
};

const unit = {
	select: {
		id: true,
		label: true,
		propertyId: true,
		type: true,
		unitNumber: true,
		property: {
			select: {
				id: true,
				label: true,
				area: true,
				block: true,
				number: true,
				portfolio: { select: { id: true, label: true, fullName: true } },
			},
		},
	} satisfies Prisma.UnitSelect,
};

const property = {
	select: {
		id: true,
		label: true,
		area: true,
		block: true,
		number: true,
		portfolio: { select: { id: true, label: true, fullName: true } },
	} satisfies Prisma.PropertySelect,
};

const portfolio = {
	select: {
		id: true,
		label: true,
		fullName: true,
	} satisfies Prisma.PortfolioSelect,
};

const tenant = {
	select: {
		id: true,
		label: true,
		fullName: true,
	} satisfies Prisma.TenantSelect,
};

export const crumbs = {
	lease,
	unit,
	property,
	portfolio,
	tenant,
};
