<script lang="ts">
	import Contact from '$lib/components/landing/Contact.svelte';
	import Faqs from '$lib/components/landing/Faqs.svelte';
	import Features from '$lib/components/landing/features/Features.svelte';
	import Footer from '$lib/components/landing/Footer.svelte';
	import Hero from '$lib/components/landing/Hero.svelte';
	import Pricing from '$lib/components/landing/pricing/Pricing.svelte';
	import PopoverDivider from '$lib/components/popover/PopoverDivider.svelte';
</script>

<Hero />
<PopoverDivider />
<!-- <SecondaryFeatures /> -->
<!-- <CallToAction /> -->
<Features />
<Pricing />
<Faqs />
<Contact />
<Footer />
