import 'chart.js';

declare module 'chart.js' {
	interface TooltipPositionerMap {
		top: TooltipPositionerFunction<ChartType>;
	}
}
