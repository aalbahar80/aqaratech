const lease = {
	select: {
		id: true,
		tenant: {
			select: {
				id: true,
				title: true,
			},
		},
		unit: {
			select: {
				id: true,
				computed: {
					select: {
						title: true,
					},
				},
				property: {
					select: {
						id: true,
						title: true,
						portfolio: {
							select: {
								id: true,
								title: true,
							},
						},
					},
				},
			},
		},
	},
};

const unit = {
	select: {
		id: true,
		computed: {
			select: {
				title: true,
			},
		},
		propertyId: true,
		property: {
			select: {
				id: true,
				title: true,
				portfolio: {
					select: {
						id: true,
						title: true,
					},
				},
			},
		},
	},
};

const property = {
	select: {
		id: true,
		title: true,
		portfolio: {
			select: {
				id: true,
				title: true,
			},
		},
	},
};

const portfolio = {
	select: {
		id: true,
		title: true,
	},
};

const tenant = {
	select: {
		id: true,
		title: true,
	},
};

export const crumbs = {
	lease,
	unit,
	property,
	portfolio,
	tenant,
};
