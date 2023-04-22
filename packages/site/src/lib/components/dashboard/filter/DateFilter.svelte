<script
	lang="ts"
	context="module"
>
	import { page } from '$app/stores';

	import L from '$i18n/i18n-svelte';
	import DateInput from '$lib/components/dashboard/filter/DateInput.svelte';
	import RangeKind from '$lib/components/dashboard/filter/RangeKind.svelte';
	import RangeSelect from '$lib/components/dashboard/filter/RangeSelect.svelte';
	import { range } from '$lib/stores/filter/range';
</script>

<div class="flex flex-col justify-between gap-4 md:flex-row md:gap-8">
	<div class="md:w-1/2">
		<RangeSelect />
	</div>

	<div class="flex gap-2 md:gap-8">
		<DateInput
			name={$L.filter.start()}
			value={$range.start}
			on:change={(e) => {
				// @ts-expect-error until forwareded events are typed
				const value = e.currentTarget.value;

				range.setDates(value, $range.end);
			}}
		/>

		<DateInput
			name={$L.filter.end()}
			value={$range.end}
			on:change={(e) => {
				// @ts-expect-error until forwareded events are typed
				const value = e.currentTarget.value;

				range.setDates($range.start, value);
			}}
		/>
	</div>

	<!-- RangeKind filter is only applicable to invoices -->
	{#if !$page.url.pathname.includes('financials/expenses')}
		<RangeKind />
	{/if}
</div>
