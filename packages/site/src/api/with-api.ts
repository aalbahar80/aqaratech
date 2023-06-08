import { type Api, createApi } from './api';
import { handleApiError } from './handle-api-error';

type ApiCallback<T> = (api: Api) => Promise<T>;
/** Wrapper around `createApi`, automatically handles api error */
export const withApi = async <T>(callback: ApiCallback<T>) => {
	const api = createApi();
	try {
		return await callback(api);
	} catch (e) {
		console.error(e);
		await handleApiError(e);
		return;
	}
};
