import { format } from 'winston';

export const httpOnlyFilter = format((info) => {
	if (info.level === 'http') {
		return info;
	} else {
		return false;
	}
});

export const includeHttp = (include: boolean) =>
	format((info) => {
		if (info.level === 'http') {
			return include ? info : false;
		} else {
			return info;
		}
	});

export const httpFormat = format.printf((info) => {
	const message = JSON.parse(info.message);

	return `[${info.label}] ${info.timestamp} [${message.httpType}]  ${
		message.method
	} ${message.pathname} ${message.status ?? ''} ${message.duration ?? ''}${
		message.duration ? 'ms' : ''
	}`;
});
