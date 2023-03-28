import type { LeaseInvoiceAggregateDto } from '$api/openapi';

export interface PieConfig<TKeys extends PropertyKey = PropertyKey> {
	groupByFunc: (x: LeaseInvoiceAggregateDto) => string;
	labels: Record<TKeys, string>;
	colors: Record<TKeys, string>;
}

// Chart context

export const CHART_CONTEXT = 'CHART_CONTEXT';

export interface ChartContext {
	title: string;
}
