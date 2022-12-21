export function digitsOnly(v: string) {
	return /^[0-9]+$/.exec(v) !== null;
}
