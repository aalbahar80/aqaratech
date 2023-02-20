const INACTIVE_ROUTE_IDS = [
	'/[lang=lang]/organizations/[organizationId]/billing',
	'/[lang=lang]/users/[id]/roles',
];

// ### Inactive ###

/** Returns true if the route is allowed while the user's organization is
 * inactive. */
export const isAllowedWhileInactive = ({
	route,
}: {
	route: {
		id: string | null;
	};
}) => {
	if (!route.id) {
		return false;
	}

	return INACTIVE_ROUTE_IDS.includes(route.id);
};

// ### Role-less ###

const NO_ROLE_ROUTE_IDS = [
	'/[lang=lang]/users/[id]/roles',
	'/[lang=lang]/welcome',
	'/[lang=lang]/organizations/new',
];

export const isAllowedWhileNoRole = (info: Info) => {
	if (!info.route.id) {
		return false;
	}

	return NO_ROLE_ROUTE_IDS.includes(info.route.id);
};

// ### Types ###

interface Info {
	route: {
		id: string | null;
	};
}
