export const parseParams = (searchParams: URLSearchParams) => {
	const obj = {};

	for (const prop of searchParams.entries()) {
		obj[prop[0]] = prop[1];
	}

	return obj;
};
