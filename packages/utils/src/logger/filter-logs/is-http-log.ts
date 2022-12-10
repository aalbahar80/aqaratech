import * as R from 'remeda';

import type { TransformableInfo } from './type';

export const isHttpLog = (info: TransformableInfo) => {
	if (!R.isObject(info)) {
		return false;
	}
	if (
		info.level === 'http' ||
		info['context'] === 'Request' ||
		info['context'] === 'Response'
	) {
		return info;
	} else {
		return false;
	}
};
