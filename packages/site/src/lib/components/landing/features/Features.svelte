<script lang="ts">
	// eslint-disable-next-line import/no-named-as-default
	import LL from '$i18n/i18n-svelte';
	import Feature from '$lib/components/landing/features/Feature.svelte';
	import { getFeatures } from '$lib/components/landing/features/features-content';

	$: features = getFeatures($LL);
</script>

<!-- Use bottom padding to avoid clipping last icon if text is short enough. -->
<div class="overflow-hidden bg-gray-100 pb-6">
	<div class="relative mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
		{#each features as feature, n (feature.title)}
			<Feature id={n + 1} {feature} />
		{/each}
	</div>
</div>
