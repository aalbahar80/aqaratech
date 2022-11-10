<script lang="ts">
	import DetailsPaneItem from '$lib/components/details-pane/DetailsPaneItem.svelte';

	type Details = $$Generic<Record<unknown, unknown>>;
	type Keys = $$Generic<keyof Details>;

	export let details: Details;
	export let keys: Keys[];
</script>

<pre>{JSON.stringify(details, null, 2)}</pre>
<!-- 
<div id="detailsPane">
	<dl class="rounded-lg shadow">
		{#each details as [key, value]}
			<DetailsPaneItem {key} {value} />
		{/each}
	</dl>
</div> -->
