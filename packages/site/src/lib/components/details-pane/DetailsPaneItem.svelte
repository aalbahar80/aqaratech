<script lang="ts">
	export let key: string;
	export let value: string | null;
</script>

<div class="row">
	<dt class="label">{key}</dt>
	<dd class="definition">
		<slot>
			{value ?? '-'}
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
