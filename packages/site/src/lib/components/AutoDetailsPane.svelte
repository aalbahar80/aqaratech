<script lang="ts">
	import DetailsPaneItem from '$lib/components/details-pane/DetailsPaneItem.svelte';
	import type { Union } from 'ts-toolbelt';

	type Details = $$Generic;
	type Keys = $$Generic<keyof Details>;

	export let details: Details;
	export let keys: Union.Exclude<Keys, number | symbol>[];
</script>

<div data-testid="details-pane">
	<dl class="rounded-lg shadow">
		{#each keys as key}
			<DetailsPaneItem {key} value={details[key]} />
		{/each}
	</dl>
</div>
