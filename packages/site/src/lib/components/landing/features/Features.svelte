<script lang="ts">
	import { features } from '$lib/components/landing/features/features-content';
	import Feature from '$lib/components/landing/features/Feature.svelte';
</script>

<div class="overflow-hidden bg-gray-100 py-16 lg:py-24">
	<div class="relative mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
		{#each features as feature, n (feature.title)}
			<Feature id={n + 1} {feature} />
		{/each}
	</div>
</div>
