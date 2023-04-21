<script lang="ts">
	import L from '$i18n/i18n-svelte';
	import Feature from '$lib/components/landing/features/Feature.svelte';
	import { getFeatures } from '$lib/components/landing/features/features-content';

	$: features = getFeatures($L);
</script>

<!-- Use bottom padding to avoid clipping last icon if text is short enough. -->
<div
	id="features"
	class="overflow-hidden bg-gray-50 pb-6 lg:pb-28"
>
	<div class="relative mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
		{#each features as feature, n (feature.title)}
			<Feature
				id={n + 1}
				{feature}
			/>
		{/each}
	</div>
</div>
