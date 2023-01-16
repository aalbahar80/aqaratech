// https://github.com/xpepermint/query-types
declare module 'query-types' {
	export function parseObject(
		obj: Record<string, unknown>,
	): Record<string, unknown>;
}
