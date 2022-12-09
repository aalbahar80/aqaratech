<script lang="ts">
	import CallToAction from '$lib/components/landing/CallToAction.svelte';
	import Hero from '$lib/components/landing/Hero.svelte';
	import Features from '$lib/components/landing/features/Features.svelte';
	import Footer from '$lib/components/landing/Footer.svelte';
	import PopoverDivider from '$lib/components/popover/PopoverDivider.svelte';
	import SecondaryFeatures from '$lib/components/landing/secondary-feature/SecondaryFeatures.svelte';
</script>

<Hero />
<PopoverDivider />
<SecondaryFeatures />
<CallToAction />
<Features />
<Footer />
