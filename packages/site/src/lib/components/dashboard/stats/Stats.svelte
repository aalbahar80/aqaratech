<script lang="ts">
	export let title = '';
</script>

<div>
	{#if title}
		<div class="flex justify-between pb-5">
			<h3 class="text-2xl font-medium leading-6 text-gray-900">{title}</h3>
			<slot name="details" />
		</div>
	{/if}
	<dl
		class="grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-y-0 md:divide-x"
	>
		<slot name="panes" />
	</dl>
</div>
