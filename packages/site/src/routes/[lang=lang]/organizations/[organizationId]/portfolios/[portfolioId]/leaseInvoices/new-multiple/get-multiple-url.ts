/**
 * Gets the url to create multiple lease invoices.
 *
 * Must be called from the new invoice form page since it uses the url params
 * and query from the current page.
 */
export const getMultipleUrl = (url: Readonly<URL>) => {
	// avoid mutating the original url
	const urlN = new URL(url.toString());

	if (!urlN.searchParams.has('leaseId')) {
		throw new Error('leaseId is required');
	}

	const pathname = urlN.pathname.split('/');

	pathname[pathname.length - 1] = 'new-multiple';

	urlN.pathname = pathname.join('/');

	// return the url without the domain
	return urlN.pathname + urlN.search;
};
