<script lang="ts">
	import L from '$i18n/i18n-svelte';
	import Container from '$lib/components/landing/secondary-feature/Container.svelte';
	import { getSecondaryFeatures } from '$lib/components/landing/secondary-feature/features';
	import FeaturesDesktop from '$lib/components/landing/secondary-feature/FeaturesDesktop.svelte';
	import FeaturesMobile from '$lib/components/landing/secondary-feature/FeaturesMobile.svelte';

	$: secondaryFeatures = getSecondaryFeatures($L);
</script>

<section
	id="secondary-features"
	aria-label="Features for simplifying everyday business tasks"
	class="pb-14 pt-20 sm:pb-20 sm:pt-32 lg:pb-32"
>
	<Container>
		<div class="mx-auto max-w-2xl md:text-center">
			<h2 class="text-3xl tracking-tight text-slate-900 sm:text-4xl">
				{$L.landing.hero.subtitle()}
			</h2>
			<p class="mt-4 text-lg tracking-tight text-slate-700">
				{$L.landing.hero.description()}
			</p>
		</div>
		<FeaturesMobile {secondaryFeatures} />
		<FeaturesDesktop {secondaryFeatures} />
	</Container>
</section>
