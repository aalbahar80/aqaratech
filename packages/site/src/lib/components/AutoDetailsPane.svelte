<script lang="ts">
	import DetailsPaneItem from '$lib/components/details-pane/DetailsPaneItem.svelte';

	type Details = $$Generic<Record<unknown, unknown>>;
	type Keys = $$Generic<keyof Details>;

	export let details: Details;
	export let keys: Keys[];
</script>

<div id="detailsPane">
	<dl class="rounded-lg shadow">
		{#each keys as key}
			<DetailsPaneItem {key} value={details[key]} />
		{/each}
	</dl>
</div>
