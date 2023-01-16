<script lang="ts">
	import { invalidate } from '$app/navigation';

	import L from '$i18n/i18n-svelte';
	import FilterRadio from '$lib/components/filter/FilterRadio.svelte';
	import { FilterEnum } from '$lib/stores/filter/Filter.enum';
	import { isPaid, PAID_STATUS } from '$lib/stores/filter/is-paid';
</script>

<FilterRadio
	label={$L.fields.isPaid()}
	filter={{
		id: FilterEnum.IsPaid,
		label: $L.fields.isPaid(),
		options: [
			{
				label: $L.badge.paid(),
				value: PAID_STATUS.PAID,
				active: $isPaid === true,
				action: async () => {
					$isPaid = true;
					await invalidate(FilterEnum.IsPaid);
				},
			},
			{
				label: 'unpaid',
				value: PAID_STATUS.UNPAID,
				active: $isPaid === false,
				action: async () => {
					$isPaid = false;
					await invalidate(FilterEnum.IsPaid);
				},
			},
			{
				label: $L.general.all(),
				value: PAID_STATUS.ALL,
				active: $isPaid === undefined,
				action: async () => {
					$isPaid = undefined;
					await invalidate(FilterEnum.IsPaid);
				},
			},
		],
	}}
/>
