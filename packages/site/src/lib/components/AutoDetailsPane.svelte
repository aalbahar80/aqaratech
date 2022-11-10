<script lang="ts">
	import DetailsPaneItem from '$lib/components/details-pane/DetailsPaneItem.svelte';
	import { objectEntries } from '$lib/utils/common';

	type Details = $$Generic<Record<unknown, unknown>>;
	type Keys = $$Generic<keyof Details>;

	export let details: Details;
	export let keys: Keys[];
</script>

<div id="detailsPane">
	<dl class="rounded-lg shadow">
		{#each objectEntries(details) as [key, value]}
			<DetailsPaneItem {key} {value} />
		{/each}
	</dl>
</div>
