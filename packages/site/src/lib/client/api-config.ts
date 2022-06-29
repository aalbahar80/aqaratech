import { Configuration } from '@self/sdk';
import type { LoadEvent } from '@sveltejs/kit';

export const config = (loadFetch: LoadEvent['fetch']) =>
	new Configuration({ fetchApi: loadFetch });
