<script lang="ts">
	import backgroundImage from '../../../assets/background-call-to-action.jpg';

	import L from '$i18n/i18n-svelte';
	import { buttonCn } from '$lib/components/landing/button-cn';
	import Container from '$lib/components/landing/secondary-feature/Container.svelte';
	import { SIGNUP } from '$lib/constants/routes';
</script>

<section
	id="get-started-today"
	class="relative overflow-hidden bg-blue-600 py-32"
>
	<img
		class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
		src={backgroundImage}
		alt=""
		width={2347}
		height={1244}
	/>
	<Container>
		<div class="relative mx-auto max-w-lg text-center">
			<h2 class="font-display text-3xl tracking-tight text-white sm:text-4xl">
				{$L.landing.callToAction.title()}
			</h2>
			<p class="mt-4 text-lg tracking-tight text-white">
				{$L.landing.callToAction.description()}
			</p>

			<a
				href={SIGNUP}
				class={buttonCn({
					cs: 'mt-10',
					color: 'white',
				})}
			>
				{$L.landing.callToAction.button()}
			</a>
		</div>
	</Container>
</section>
