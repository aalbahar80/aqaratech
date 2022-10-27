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

export const devConsoleFormat = format.printf((info) => {
	if (info.level === 'http') {
		return formatHttp(info);
	} else {
		return `[${info.label}] ${info.timestamp} [${info.level}] ${info.message}`;
	}
});

const formatHttp = (info) => {
	const message = JSON.parse(info.message);

	return `[${info.label}] ${info.timestamp} [${message.httpType}]  ${
		message.method
	} ${message.pathname} ${message.status ?? ''} ${message.duration ?? ''}${
		message.duration ? 'ms' : ''
	}`;
};
