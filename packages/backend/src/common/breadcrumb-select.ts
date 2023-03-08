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
	},
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
	},
};

const property = {
	select: {
		id: true,
		label: true,
		area: true,
		block: true,
		number: true,
		portfolio: { select: { id: true, label: true, fullName: true } },
	},
};

const portfolio = {
	select: { id: true, label: true, fullName: true },
};

const tenant = {
	select: {
		id: true,
		label: true,
		fullName: true,
	},
};

export const crumbs = {
	lease,
	unit,
	property,
	portfolio,
	tenant,
};
