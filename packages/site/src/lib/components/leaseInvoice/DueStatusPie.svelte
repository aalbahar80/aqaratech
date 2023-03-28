<script lang="ts">
	import { setContext } from 'svelte';

	import { DueStatusEnum, type LeaseInvoiceAggregateDto } from '$api/openapi';
	import L from '$i18n/i18n-svelte';
	import Pie from '$lib/components/leaseInvoice/Pie.svelte';
	import {
		CHART_CONTEXT,
		type ChartContext,
		type PieConfig,
	} from '$lib/models/interfaces/pie-config.interface';
	import { colors } from '$lib/utils/colors';

	export let aggregate: LeaseInvoiceAggregateDto[];

	const config = {
		labels: {
			[DueStatusEnum.NotDue]: $L.badge.notYetDue(),
			[DueStatusEnum.Due]: $L.badge.due(),
			[DueStatusEnum.PastDue]: $L.badge.overdue(),
		},
		colors: {
			[DueStatusEnum.NotDue]: colors.darkBlue,
			[DueStatusEnum.Due]: colors.blue,
			[DueStatusEnum.PastDue]: colors.red,
		},
		groupByFunc: (x) => x.dueStatus,
	} satisfies PieConfig<DueStatusEnum>;

	setContext<ChartContext>(CHART_CONTEXT, {
		title: $L.general.uncollected(),
	});
</script>

<Pie
	{aggregate}
	{config}
/>
