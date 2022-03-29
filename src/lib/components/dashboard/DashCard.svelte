<script lang="ts">
	export let title: string;
	export let subtitle = '';
</script>

<div class="flex flex-col gap-y-8 rounded-lg bg-white p-6 shadow">
	<div class="prose prose-base">
		<h3>{title}</h3>
		<p>{subtitle}</p>
	</div>
	<!-- <div class="py-2">
		<slot />
	</div> -->
	<div
		class="flex h-52 flex-col place-content-center rounded-md bg-gray-100 text-center"
	>
		<div class="prose place-self-center">
			<small>No Data</small>
			<br />
			<small>There's no data available for your selection.</small>
		</div>
	</div>
</div>
