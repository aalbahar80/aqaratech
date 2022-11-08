import type { TransformFunction } from './type';
import { isHttpLog } from 'src/logger/filter-logs/is-http-log';

/**
 * Place in format.combine to ignore http logs
 */
export const onlyHttp: TransformFunction = (info) => {
	if (isHttpLog(info)) {
		return info;
	}
	return false;
};
