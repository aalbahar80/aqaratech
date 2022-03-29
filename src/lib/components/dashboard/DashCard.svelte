<script lang="ts">
	export let title: string;
	export let subtitle = '';
	export let empty = false;
</script>

<div class="flex flex-col gap-y-8 rounded-lg bg-white p-6 shadow">
	<div class="prose prose-base">
		<h3>{title}</h3>
		<p>{subtitle}</p>
	</div>
	{#if empty}
		<div
			class="inline-flex h-52 grow flex-col place-content-center rounded-md bg-gray-100 text-center"
		>
			<div class="prose prose-xl place-self-center">
				<small class="font-medium">No Data</small>
				<br />
				<small>There's no data available for your selection.</small>
			</div>
		</div>
	{:else}
		<slot name="groupBy" />
		<slot />
	{/if}
</div>
