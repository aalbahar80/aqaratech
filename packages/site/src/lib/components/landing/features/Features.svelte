<script lang="ts">
	import { features } from '$lib/components/landing/features/features-content';
	import Feature from '$lib/components/landing/features/Feature.svelte';
</script>

<!-- Use bottom padding to avoid clipping last icon if text is short enough. -->
<div class="overflow-hidden bg-gray-100 pb-6">
	<div class="relative mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
		{#each features as feature, n (feature.title)}
			<Feature id={n + 1} {feature} />
		{/each}
	</div>
</div>
