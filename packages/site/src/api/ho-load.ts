import { createApi, type Api } from '$api';
import type { Load } from '@sveltejs/kit';

type Callback<T extends Load, K, WithApi = false> = (
	args: WithApi extends true
		? Parameters<T>[0] & { api: Api }
		: Parameters<T>[0],
) => Promise<K>;

// export type Fancy<ThisLoad extends Load> = <Output>(
// 	fn: Callback<ThisLoad, Output, true>,
// ) => Callback<ThisLoad, Output>;

export const fancy = <ThisLoad extends Load, Output>(
	fn: Callback<ThisLoad, Output, true>,
): Callback<ThisLoad, Output> => {
	return async (args) => {
		const apiClient = createApi(args.fetch);
		return fn.call(null, { ...args, api: apiClient });
	};
};
