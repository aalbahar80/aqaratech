<script lang="ts">
	export let value: any;
	export let name: string;
</script>

<div class="block w-1/2">
	<label for={name} class="block pb-2 text-sm font-medium text-gray-700">
		{name}
	</label>

	<input id={name} class="date-input" type="date" {value} on:change />
</div>

<style lang="postcss">
	.date-input {
		@apply w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm;
		@apply disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none;
	}
	/* .date-input-invalid { */
	/* 	@apply border-pink-500 text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500; */
	/* } */
</style>
