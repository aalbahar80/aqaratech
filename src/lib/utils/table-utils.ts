export const parseParams = (url: URL) => {
	const pageSize = Number(url.searchParams.get('pageSize')) || 11;
	const pageIndex = Number(url.searchParams.get('page')) || 1;
	const search = url.searchParams.get('search') || '';
	const skip = (pageIndex - 1) * pageSize;
	const sortDir = url.searchParams.get('sortDir') || 'desc';
	const sortKey = url.searchParams.get('sortKey') || 'createdAt';

	return {
		options: { pageSize, pageIndex, search, skip, sortDir, sortKey },
		queryString: `?page=${pageIndex}&pageSize=${pageSize}&search=${search}&sortDir=${sortDir}&sortKey=${sortKey}`,
	};
};
