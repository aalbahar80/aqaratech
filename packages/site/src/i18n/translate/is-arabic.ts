export function isArabic(str: string) {
	return /[\u0600-\u06FF]/.test(str);
}
