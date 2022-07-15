export const getCreateHref = (pathname: string) => {
	const predefined = new Map<string, any>();
	if (pathname.startsWith('/unit')) {
		const unitId = pathname.split('/')[2];
		predefined.set('unitId', unitId);
	} else if (pathname.startsWith('/tenant')) {
		const tenantId = pathname.split('/')[2];
		predefined.set('tenantId', tenantId);
	} else {
		return undefined;
	}
	return predefined;
};
