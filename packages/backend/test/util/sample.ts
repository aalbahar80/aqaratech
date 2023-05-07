export const SAMPLE = {
	tenant: {
		organizationId: '0',
	},

	portfolio: {
		organizationId: '0',
	},

	property: {
		organizationId: '0',
		portfolioId: '0',
	},

	unit: {
		organizationId: '0',
		portfolioId: '0',
		propertyId: '0',
		unitNumber: '1',
	},

	lease: {
		organizationId: '0',
		portfolioId: '0',
		unitId: '0',
		tenantId: '0',
		start: new Date(),
		end: new Date(),
		monthlyRent: 1,
	},

	leaseInvoice: {
		organizationId: '0',
		portfolioId: '0',
		leaseId: '0',
		amount: 1,
		postAt: new Date(),
	},

	expense: {
		organizationId: '0',
		portfolioId: '0',
		amount: 1,
		postAt: new Date(),
	},

	payout: {
		organizationId: '0',
		portfolioId: '0',
		amount: 1,
		postAt: new Date(),
	},

	maintenanceOrder: {
		organizationId: '0',
		portfolioId: '0',
	},
};
