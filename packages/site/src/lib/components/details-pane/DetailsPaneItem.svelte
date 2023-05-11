<script lang="ts">
	import { formatValue, getMyfatoorahReceipt } from '@self/utils';

	import { locale } from '$i18n/i18n-svelte';
	import { environment } from '$lib/environment';
	import { getIntlLabel } from '$lib/i18n/get-intl-label';

	export let key: string;
	export let value: unknown;

	/** A label to display for the key. If not provided, a label will be generated from the key. */
	export let label: string | undefined = undefined;
</script>

<div
	class="row"
	data-testid={key}
>
	<dt class="label">{label ?? getIntlLabel(key)}</dt>
	<dd
		class="definition"
		data-testid={value ?? ''}
	>
		{#if key === 'mfPaymentId' && value && typeof value === 'string'}
			<a
				href={getMyfatoorahReceipt({
					paymentId: value,
					myfatoorahURL: environment.PUBLIC_MYFATOORAH_SITE_URL,
				})}
				target="_blank"
				rel="noopener noreferrer"
				class="text-indigo-600 hover:text-indigo-900"
			>
				{value}
			</a>
		{:else}
			{formatValue(value, $locale)}
		{/if}
	</dd>
</div>

<style lang="postcss">
	.row {
		@apply px-4 py-5 first:rounded-t-md last:rounded-b-md odd:bg-gray-50 even:bg-white print:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6;
	}
	.label {
		@apply text-sm font-medium text-gray-500;
	}
	.definition {
		@apply mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0;
	}
</style>
