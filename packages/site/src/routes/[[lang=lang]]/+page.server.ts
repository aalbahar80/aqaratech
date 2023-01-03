import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals: { LL } }) => {
	// TEST: rm
	console.info(LL.log({ fileName: '+page.server.ts' }));
};
