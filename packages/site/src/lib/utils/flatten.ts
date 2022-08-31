import * as _ from 'lodash-es';

export function flatten(obj: Record<string, any>, prefix = '') {
	const propName = prefix ? prefix + '.' : '',
		ret: Record<string, any> = {};

	for (const attr in obj) {
		if (_.isArray(obj[attr])) {
			ret[attr] = obj[attr].join(',');
		} else if (typeof obj[attr] === 'object') {
			_.extend(ret, flatten(obj[attr], propName + attr));
		} else {
			ret[propName + attr] = obj[attr];
		}
	}
	return ret;
}
