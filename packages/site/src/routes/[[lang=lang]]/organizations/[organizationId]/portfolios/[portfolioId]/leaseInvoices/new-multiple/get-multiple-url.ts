/**
 * Gets the url to create multiple lease invoices.
 *
 * Must be called from the new invoice form page since it uses the url params
 * and query from the current page.
 */
export const getMultipleUrl = (url: URL) => {
	if (!url.searchParams.has('leaseId')) {
		throw new Error('leaseId is required');
	}

	const pathname = url.pathname.split('/');

	pathname[pathname.length - 1] = 'new-multiple';

	url.pathname = pathname.join('/');

	// return the url without the domain
	return url.pathname + url.search;
};
