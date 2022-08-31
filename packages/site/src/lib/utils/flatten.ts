export function flatten(obj: Record<string, any>, prefix?: string) {
	const propName = prefix ? prefix + '.' : '',
		ret: Record<string, any> = {};

	for (const attr in obj) {
		if (Array.isArray(obj[attr])) {
			ret[attr] = obj[attr].join(',');
		} else if (typeof obj[attr] === 'object') {
			Object.assign(ret, flatten(obj[attr], propName + attr));
		} else {
			ret[propName + attr] = obj[attr];
		}
	}
	return ret;
}
