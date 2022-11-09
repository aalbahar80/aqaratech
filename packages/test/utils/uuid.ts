export const uuidRegex =
	'[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';

export const uuid = (url: string): RegExp =>
	new RegExp(url.replace(':uuid', uuidRegex));
