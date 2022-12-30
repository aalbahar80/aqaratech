import { isHttpLog } from './is-http-log';
import type { TransformFunction } from './type';

/**
 * Place in format.combine to ignore http logs
 */
export const onlyHttp: TransformFunction = (info) => {
	if (isHttpLog(info)) {
		return info;
	}
	return false;
};
