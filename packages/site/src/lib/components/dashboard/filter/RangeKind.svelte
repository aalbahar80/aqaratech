<script lang="ts">
	import { invalidate } from '$app/navigation';

	import L from '$i18n/i18n-svelte';
	import { FilterEnum } from '$lib/stores/filter/Filter.enum';
	import { rangeKind } from '$lib/stores/filter/range';
</script>

<div
	class="flex gap-4 whitespace-nowrap text-sm font-medium text-gray-700 md:flex-col md:gap-2"
>
	<legend> {$L.filter.rangeKind()} </legend>
	<label>
		<input
			type="radio"
			name="rangeKind"
			value="postAt"
			bind:group={$rangeKind}
			on:change={async () => {
				await invalidate(FilterEnum.RangeKind);
			}}
		/>
		<span class="ms-1 font-normal">{$L.fields.postAt()}</span>
	</label>
	<label>
		<input
			type="radio"
			name="rangeKind"
			value="paidAt"
			bind:group={$rangeKind}
			on:change={async () => {
				await invalidate(FilterEnum.RangeKind);
			}}
		/>
		<span class="ms-1 font-normal">{$L.fields.paidAt()}</span>
	</label>
</div>
