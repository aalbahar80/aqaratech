import { api, type Api } from '$lib/client/api';
import type { Load } from '@sveltejs/kit';

type Callback<T extends Load, K, WithApi = false> = (
	args: WithApi extends true
		? Parameters<T>[0] & { api: Api }
		: Parameters<T>[0],
) => Promise<K>;

type Fancy = <T extends Load, K>(fn: Callback<T, K, true>) => Callback<T, K>;

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
