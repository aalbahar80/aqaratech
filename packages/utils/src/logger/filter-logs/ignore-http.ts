import { isHttpLog } from './is-http-log';

import type { TransformFunction } from './type';

/**
 * Place in format.combine to ignore http logs
 */
export const ignoreHttp: TransformFunction = (info) => {
	if (isHttpLog(info)) {
		return false;
	}
	return info;
};
