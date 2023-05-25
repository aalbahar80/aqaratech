<script lang="ts">
	import L from '$i18n/i18n-svelte';
	import Plan from '$lib/components/landing/pricing/Plan.svelte';
	import Container from '$lib/components/landing/secondary-feature/Container.svelte';
	import { SIGNUP } from '$lib/constants/routes';
</script>

<section
	aria-label="Pricing"
	class="bg-slate-900 py-20 sm:py-32"
>
	<!-- phantom element to fix nav overlap for same-page links -->
	<div
		id="pricing"
		class="relative -top-32"
	/>
	<Container>
		<!-- <div class="md:text-center"> -->
		<!-- 	<h2 class="font-display text-3xl tracking-tight text-white sm:text-4xl"> -->
		<!-- 		<span class="relative whitespace-nowrap"> -->
		<!-- 			<SwirlyDoodle -->
		<!-- 				cs="absolute top-1/2 left-0 h-[1em] w-full fill-blue-400" -->
		<!-- 			/> -->
		<!-- 			<span class="relative">Simple pricing,</span> -->
		<!-- 		</span>{' '} -->
		<!-- 		for everyone. -->
		<!-- 	</h2> -->
		<!-- 	<p class="mt-4 text-lg text-slate-400"> -->
		<!-- 		It doesn’t matter what size your business is, our software won’t work -->
		<!-- 		well for you. -->
		<!-- 	</p> -->
		<!-- </div> -->

		<div class="md:text-center">
			<h2 class="font-display text-3xl tracking-tight text-white sm:text-4xl">
				<span class="relative whitespace-nowrap">
					{$L.landing.pricing.title()}
				</span>
			</h2>
			<p class="mt-4 text-lg text-slate-400 lg:px-36">
				{$L.landing.pricing.subtitle()}
			</p>
		</div>

		<div
			class="-mx-4 mt-16 grid max-w-2xl grid-cols-1 gap-y-10 sm:mx-auto lg:-mx-8 lg:max-w-none lg:grid-cols-3 xl:mx-0 xl:gap-x-8"
		>
			<Plan
				cs="bg-[#6699CC]"
				plan={{
					featured: true,
					name: $L.landing.pricing.plans['1'].name(),
					price: $L.landing.pricing.plans['1'].price(),
					description: $L.landing.pricing.plans['1'].description(),
					href: SIGNUP,
					features: Object.values($L.landing.pricing.plans['1'].features).map(
						(v) => v(),
					),
				}}
			/>
			<Plan
				cs="bg-[#0D0D70]"
				plan={{
					featured: true,
					name: $L.landing.pricing.plans['2'].name(),
					price: $L.landing.pricing.plans['2'].price(),
					description: $L.landing.pricing.plans['2'].description(),
					href: SIGNUP,
					features: Object.values($L.landing.pricing.plans['2'].features).map(
						(v) => v(),
					),
				}}
			/>
			<Plan
				cs="bg-[#4060E4]"
				plan={{
					featured: true,
					name: $L.landing.pricing.plans['3'].name(),
					price: $L.landing.pricing.plans['3'].price(),
					description: $L.landing.pricing.plans['3'].description(),
					href: SIGNUP,
					features: Object.values($L.landing.pricing.plans['3'].features).map(
						(v) => v(),
					),
				}}
			/>
		</div>
	</Container>
</section>
