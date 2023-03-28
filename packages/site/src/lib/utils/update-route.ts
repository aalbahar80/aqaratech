/** Updates the route with any new properties */
export function getUpdatedRoute({
	routeId,
	params,
	props,
}: {
	routeId: string;
	params: Record<string, string>;
	props: Map<string, string>;
}) {
	let pathname = routeId;

	props.forEach((value, key) => {
		// check if the routeId contains the key
		if (pathname.includes(`[${key}]`)) {
			// replace the key with the value
			pathname = pathname.replace(`[${key}]`, value);
		} else {
			console.log('WARNING: routeId does not contain the key');

			// check if the params contains the key
			if (params[key]) {
				// replace the key with the value
				params[key] = value;
			} else {
				throw new Error('params does not contain the key');
			}
		}
	});

	return pathname;
}
