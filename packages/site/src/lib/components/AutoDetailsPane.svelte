<script lang="ts">
	import DetailsPaneItem from '$lib/components/details-pane/DetailsPaneItem.svelte';

	// type Keys = $$Generic<keyof typeof details>;
	// type Details = $$Generic<Record<string, unknown>>;
	type Keys = $$Generic<string>;
	type Details = $$Generic<{ [key in Keys] }>;

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
