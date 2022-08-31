import * as _ from 'lodash-es';

export function flatten(obj, prefix) {
	var propName = prefix ? prefix + '.' : '',
		ret = {};

	for (var attr in obj) {
		if (_.isArray(obj[attr])) {
			var len = obj[attr].length;
			ret[attr] = obj[attr].join(',');
		} else if (typeof obj[attr] === 'object') {
			_.extend(ret, flatten(obj[attr], propName + attr));
		} else {
			ret[propName + attr] = obj[attr];
		}
	}
	return ret;
}
