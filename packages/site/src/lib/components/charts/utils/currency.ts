import type { ChartType, TooltipItem } from 'chart.js';

export const currencyTooltip = (
	context: TooltipItem<ChartType>,
	CL: string,
) => {
	let label = context.dataset.label || '';

	if (label) {
		label += ': ';
	}
	if (context.parsed.y !== null) {
		label += new Intl.NumberFormat(CL, {
			style: 'currency',
			currency: 'KWD',
			minimumFractionDigits: 0,
		}).format(context.parsed.y);
	}
	return label;
};
