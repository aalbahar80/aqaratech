import type { ChartType } from 'chart.js/types/index.esm';

declare module 'chart.js/dist/chart.esm' {
	interface TooltipPositionerMap {
		top: TooltipPositionerFunction<ChartType>;
	}
}
