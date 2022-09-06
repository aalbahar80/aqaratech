import { api, type Api } from '$lib/client/api';
import type { PageLoad } from './$types';

type LoadArgs = Parameters<PageLoad>[0];
type Callback<T, WithApi = false> = (
	args: WithApi extends true ? LoadArgs & { api: Api } : LoadArgs,
) => Promise<T>;
type Fancy = <T>(fn: Callback<T, true>) => Callback<T>;

export const fancy: Fancy = (fn) => {
	return async (args) => {
		const parentData = await args.parent();
		const apiClient = api({
			loadFetch: args.fetch,
			...parentData.apiConfig,
		});
		return fn.call(null, { ...args, api: apiClient });
	};
};
