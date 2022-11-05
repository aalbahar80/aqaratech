<script lang="ts">
	import DetailsPaneItem from '$lib/components/details-pane/DetailsPaneItem.svelte';

	export let details: [string, string | null][];
</script>

<div id="detailsPane">
	<dl class="rounded-lg shadow">
		{#each details as [key, value]}
			<DetailsPaneItem {key} {value} />
		{/each}
	</dl>
</div>
