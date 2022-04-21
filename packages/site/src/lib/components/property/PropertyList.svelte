<script lang="ts">
	import PropertyCard from '$components/property/PropertyCard.svelte';
	import type { InferQueryOutput } from '$lib/client/trpc';
	import StackedList from '$lib/components/StackedList.svelte';

	type Properties = NonNullable<InferQueryOutput<'clients:read'>>['properties'];
	export let properties: Properties;
</script>

<StackedList entity="properties" count={properties.length}>
	{#each properties as property, idx (property.id)}
		<li>
			<PropertyCard {property} {idx} />
		</li>
	{/each}
</StackedList>
