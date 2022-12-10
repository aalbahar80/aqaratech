declare module 'frappe-charts' {
	class Chart {
		constructor(container: HTMLElement, options: ChartOptions);

		addDataPoint(
			label: string,
			valueFromEachDataset: number[],
			index: number,
		): void;
		removeDataPoint(index: number): void;
		update(data: Data): void;
		export(): void;
	}
}

interface ChartOptions {
	data: Data;
	title: string;
	type: ChartType;
	colors: string[];
	height: number;
	animate: boolean;
	truncateLegends: boolean;
	axisOptions: AxisOptions;
	tooltipOptions: TooltipOptions;
	barOptions: BarOptions;
	lineOptions: LineOptions;
	isNavigable: boolean;
	valuesOverPoints: boolean;
	maxSlices: number;
	countLabel: string;
}

type ChartType =
	| 'line'
	| 'bar'
	| 'axis-mixed'
	| 'pie'
	| 'percentage'
	| 'heatmap';

interface AxisOptions {
	xAxisMode?: AxisMode;
	yAxisMode?: AxisMode;
	xIsSeries?: boolean;
}

type AxisMode = 'span' | 'tick';

interface TooltipOptions {
	formatTooltipX?: (d: string) => string;
	formatTooltipY?: (d: number) => string;
}

interface BarOptions {
	spaceRatio?: number;
	stacked?: boolean;
}

interface LineOptions {
	heatLine?: boolean;
	hideLine?: boolean;
	dotSize?: number;
	hideDots?: boolean;
	regionFill?: boolean;
	spline?: boolean;
}

interface Data {
	labels?: string[];
	datasets?: Dataset[];
	dataPoints?: HeatmapDatapoints;

	chartType?: ChartType;

	yMarkers?: { label: string; value: number }[];
	yRegions?: { label: string; start: number; end: number }[];
}

interface Dataset {
	name?: string;
	values: number[];
}

type HeatmapDatapoints = Record<number, number>;
