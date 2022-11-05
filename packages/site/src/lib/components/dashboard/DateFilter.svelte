<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { defaultRange } from '$lib/components/charts/utils/date-range';
	import Select from '$lib/components/form/inputs/Select.svelte';
	import { toDateInput } from '$lib/utils/common';
	import { startOfMonthN } from '@self/utils';

	$: start = $page.url.searchParams.get('start') || startOfMonthN(defaultRange);
	$: end =
		$page.url.searchParams.get('end') || new Date().toISOString().slice(0, 10);

	const rangeOptions = [
		{ value: 0, label: 'Month to date' },
		{ value: 3, label: 'Last 3 months' },
		{ value: 6, label: 'Last 6 months' },
		{ value: 12, label: 'Last 12 months' },
		{ value: null, label: 'Custom' },
	];

	$: rangeValid = start && end && new Date(start) < new Date(end);

	const handleRange = async (url: URL) => {
		await goto(url, { noScroll: true, keepFocus: true });
	};

	const isReasonable = (value: string) => {
		const date = new Date(value);
		const year = date.getFullYear();
		return (
			date instanceof Date &&
			!isNaN(date.getTime()) &&
			year > 1900 &&
			year < 2100
		);
	};
</script>

<div class="flex flex-col gap-1 md:w-3/5 md:flex-auto md:flex-row">
	<!-- Range -->
	<div class="md:w-1/2">
		<Select
			current={defaultRange}
			options={rangeOptions}
			on:select={(e) => {
				const value = e.detail.value;
				if (value !== null && value !== undefined) {
					// value of zero is acceptable here since it represents month-to-date
					const url = new URL($page.url);
					url.searchParams.set('start', startOfMonthN(value));
					url.searchParams.set('end', new Date().toISOString());
					goto(url, { noScroll: true, keepFocus: true });
				}
			}}
		/>
	</div>

	<div class="flex gap-1 md:w-1/2">
		<!-- Start -->
		<input
			type="date"
			name="start"
			class="date-input"
			class:date-input-invalid={!rangeValid}
			value={start ? toDateInput(new Date(start)) : ''}
			on:change={(e) => {
				const baseDate = e.currentTarget.value;
				const date = `${baseDate}T00:00:00.000Z`;
				if (isReasonable(date)) {
					const url = new URL($page.url);
					url.searchParams.set('start', date);
					handleRange(url);
				}
			}}
		/>

		<!-- End -->
		<input
			type="date"
			name="end"
			class="date-input"
			class:date-input-invalid={!rangeValid}
			value={end ? toDateInput(new Date(end)) : ''}
			on:change={(e) => {
				const baseDate = e.currentTarget.value;
				const date = `${baseDate}T00:00:00.000Z`;
				if (isReasonable(date)) {
					const url = new URL($page.url);
					url.searchParams.set('end', date);
					handleRange(url);
				}
			}}
		/>
	</div>
</div>

<style lang="postcss">
	.date-input {
		@apply block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm;
		@apply disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none;
	}
	.date-input-invalid {
		@apply border-pink-500 text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500;
	}
</style>
