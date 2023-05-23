<script lang="ts">
	// Text
	export let primaryText: string;
	export let secondaryText = '';

	// Values
	export let primaryValue: number | string;
	export let textColor = 'text-gray-900';
	export let valueText = '';
</script>

<div class="pb-4">
	<dt class="whitespace-nowrap text-base font-normal text-gray-900">
		{primaryText}
		<span class="px-2 text-xs font-normal text-gray-500">{secondaryText}</span>
	</dt>
	<dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
		<div
			class={`flex items-baseline text-lg font-semibold lg:text-2xl ${textColor}`}
		>
			{primaryValue}
			<span class="ml-2 text-sm font-medium text-gray-500">{valueText}</span>
		</div>
	</dd>
</div>
