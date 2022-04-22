export const getCreateHref = (pathname: string) => {
	if (pathname.startsWith('/unit')) {
		const unitId = pathname.split('/')[2];
		return `/new/leases?unitId=${unitId}`;
	} else if (pathname.startsWith('/tenant')) {
		const tenantId = pathname.split('/')[2];
		return `/new/leases?tenantId=${tenantId}`;
	} else {
		return `/new/leases`;
	}
};
