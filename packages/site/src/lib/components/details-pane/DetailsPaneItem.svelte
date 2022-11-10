<script lang="ts">
	import { toUTCFormat } from '$lib/utils/common';
	import { isDatetime } from '@self/utils';

	export let key: string;
	export let value: unknown;
</script>

<div class="row">
	<dt class="label">{key}</dt>
	<dd class="definition">
		<slot>
			{#if typeof value === 'string' && isDatetime(value)}
				{toUTCFormat(value)}
			{:else}
				{value ?? '-'}
			{/if}
		</slot>
	</dd>
</div>

<style lang="postcss">
	.row {
		@apply px-4 py-5 first:rounded-t-md last:rounded-b-md odd:bg-gray-50 even:bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6;
	}
	.label {
		@apply text-sm font-medium text-gray-500;
	}
	.definition {
		@apply mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0;
	}
</style>
