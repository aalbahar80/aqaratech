import type { TooltipItem, ChartType } from 'chart.js';

export const currencyTooltip = (context: TooltipItem<ChartType>) => {
	let label = context.dataset.label || '';

	if (label) {
		label += ': ';
	}
	if (context.parsed.y !== null) {
		label += new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'KWD',
			minimumFractionDigits: 0,
		}).format(context.parsed.y);
	}
	return label;
};
