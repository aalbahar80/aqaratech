<script lang="ts">
	import DetailsPaneItem from '$lib/components/details-pane/DetailsPaneItem.svelte';

	type Details = $$Generic;
	type Keys = $$Generic<keyof Details>;

	export let details: Details;
	export let keys: Readonly<Exclude<Keys, number | symbol>[]>;
</script>

<div data-testid="details-pane">
	<dl class="rounded-lg shadow print:shadow-none">
		{#each keys as key}
			<DetailsPaneItem
				{key}
				value={details[key]}
			/>
		{/each}
	</dl>
</div>
