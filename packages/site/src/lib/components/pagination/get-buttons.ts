export function getButtons(
	pageIdx: number,
	pageCount: number,
	extended = false,
) {
	if (pageCount === 1) return [1];
	const center = extended
			? [pageIdx - 2, pageIdx - 1, pageIdx, pageIdx + 1, pageIdx + 2]
			: [pageIdx - 1, pageIdx, pageIdx + 1],
		filteredCenter: (number | null)[] = center.filter(
			(p) => p > 1 && p < pageCount,
		),
		includeThreeLeft = pageIdx === 5,
		includeThreeRight = pageIdx === pageCount - 4,
		includeLeftDots = pageIdx > 5,
		includeRightDots = pageIdx < pageCount - 4;

	if (includeThreeLeft) filteredCenter.unshift(2);
	if (includeThreeRight) filteredCenter.push(pageCount - 1);

	if (includeLeftDots) filteredCenter.unshift(null);
	if (includeRightDots) filteredCenter.push(null);

	return [1, ...filteredCenter, pageCount];
}
