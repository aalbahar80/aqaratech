export const getMultipleUrl = (url: URL) => {
	// change the last segment of the pathname from 'new' to 'new-multiple'

	const pathname = url.pathname.split('/');

	pathname[pathname.length - 1] = 'new-multiple';

	url.pathname = pathname.join('/');

	return url;
};
