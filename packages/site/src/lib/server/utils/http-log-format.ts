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

const clc = {
	bold: (text: string) => `\x1B[1m${text}\x1B[0m`,
	green: (text: string) => `\x1B[32m${text}\x1B[39m`,
	yellow: (text: string) => `\x1B[33m${text}\x1B[39m`,
	red: (text: string) => `\x1B[31m${text}\x1B[39m`,
	magentaBright: (text: string) => `\x1B[95m${text}\x1B[39m`,
	cyanBright: (text: string) => `\x1B[96m${text}\x1B[39m`,
};

const formatHttp = (info) => {
	const message = JSON.parse(info.message);

	return `[${info.label}] ${info.timestamp} ${clc.yellow(
		'[' + message.httpType + ']',
	)}  ${message.method} ${message.pathname} ${message.status ?? ''} ${
		message.duration ?? ''
	}${message.duration ? 'ms' : ''}`;
};
