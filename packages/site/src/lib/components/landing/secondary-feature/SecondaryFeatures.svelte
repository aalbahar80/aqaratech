<script lang="ts">
	// eslint-disable-next-line import/no-named-as-default
	import LL from '$i18n/i18n-svelte';
	import Container from '$lib/components/landing/secondary-feature/Container.svelte';
	import { getSecondaryFeatures } from '$lib/components/landing/secondary-feature/features';
	import FeaturesDesktop from '$lib/components/landing/secondary-feature/FeaturesDesktop.svelte';
	import FeaturesMobile from '$lib/components/landing/secondary-feature/FeaturesMobile.svelte';

	$: secondaryFeatures = getSecondaryFeatures($LL);
</script>

<section
	id="secondary-features"
	aria-label="Features for simplifying everyday business tasks"
	class="pt-20 pb-14 sm:pb-20 sm:pt-32 lg:pb-32"
>
	<Container>
		<div class="mx-auto max-w-2xl md:text-center">
			<h2 class="text-3xl tracking-tight text-slate-900 sm:text-4xl">
				Property management simplified.
			</h2>
			<p class="mt-4 text-lg tracking-tight text-slate-700">
				Aqaratech provides a comprehensive, easy-to-use platform where you can
				manage multiple properties, keep track of important tasks and deadlines,
				and quickly access important information – all in one place.
			</p>
		</div>
		<FeaturesMobile {secondaryFeatures} />
		<FeaturesDesktop {secondaryFeatures} />
	</Container>
</section>
