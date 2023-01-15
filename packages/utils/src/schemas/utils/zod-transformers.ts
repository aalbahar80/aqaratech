export function digitsOnly(v: string) {
	return /^\d+$/.exec(v) !== null;
}
