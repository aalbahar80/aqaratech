// Replaces the locale slug in a URL.
//
// If the `full` argument is set to `true`, the full URL is returned as a string.
// e.g. https://mywebsite.com/en/blog/article-1 => https://mywebsite.com/de/blog/article-1
//
// Otherwise (default) the URL relative to the base is returned.
// e.g. https://mywebsite.com/en/blog/article-1 => /de/blog/article-1
export const replaceLocaleInUrl = (
	url: Readonly<URL>,
	locale: string,
	full = false,
): string => {
	const updatedUrl = new URL(url.toString());
	const [, , ...rest] = updatedUrl.pathname.split('/');
	const new_pathname = `/${[locale, ...rest].join('/')}`;
	if (!full) {
		return `${new_pathname}${updatedUrl.search}`;
	}
	updatedUrl.pathname = new_pathname;
	return updatedUrl.toString();
};
