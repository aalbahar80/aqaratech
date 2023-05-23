<script lang="ts">
	import type { PieConfig } from '$lib/models/interfaces/pie-config.interface';

	import { PaymentTimeEnum, type LeaseInvoiceAggregateDto } from '$api/openapi';
	import L from '$i18n/i18n-svelte';
	import Pie from '$lib/components/leaseInvoice/Pie.svelte';
	import { colors } from '$lib/utils/colors';

	export let aggregate: LeaseInvoiceAggregateDto[];

	const config = {
		labels: {
			[PaymentTimeEnum.Advanced]: $L.badge.advanced(),
			[PaymentTimeEnum.OnTime]: $L.badge.onTime(),
			[PaymentTimeEnum.Late]: $L.badge.late(),
		},
		colors: {
			[PaymentTimeEnum.Advanced]: colors.darkBlue,
			[PaymentTimeEnum.OnTime]: colors.blue,
			[PaymentTimeEnum.Late]: colors.red,
		},
		groupByFunc: (x) => x.paymentTime,
	} satisfies PieConfig<PaymentTimeEnum>;
</script>

<Pie
	{aggregate}
	{config}
>
	<slot />
</Pie>
