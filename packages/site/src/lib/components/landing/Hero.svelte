<script lang="ts">
	import HeroSubtitle from './HeroSubtitle.svelte';
	import UnderlineDecoration from './UnderlineDecoration.svelte';

	import L from '$i18n/i18n-svelte';
	import { buttonCn } from '$lib/components/landing/button-cn';
	import { SIGNUP } from '$lib/constants/routes';
</script>

<div
	class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
	data-testid="hero"
>
	<div class="flex flex-col gap-8 pb-16 pt-20 text-center lg:pt-32">
		<div class="flex flex-col pb-12 lg:flex-row">
			<h1
				class="font-display mx-auto max-w-4xl text-5xl font-medium tracking-tight text-slate-900 max-[300px]:text-4xl sm:text-7xl"
			>
				{$L.landing.hero.titlePrefix()}
				<br />
				<span class="relative whitespace-nowrap text-blue-600">
					<UnderlineDecoration />
					<span class="relative"> {$L.landing.hero.titleHighlight()}</span>
				</span>
				{$L.landing.hero.titleSuffix()}
			</h1>

			<p
				class="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700 lg:hidden"
			>
				{$L.landing.hero.subtitle()}
				{$L.landing.hero.description()}
			</p>
			<div class="hidden lg:block">
				<HeroSubtitle />
			</div>
		</div>

		<div class="flex justify-center gap-8">
			<a
				href="https://ojab1kn3vda.typeform.com/to/eet5fojG"
				target="_blank"
				rel="noopener noreferrer external"
				data-sveltekit-reload
				type="submit"
				class={buttonCn({
					cs: 'w-32',
				})}
			>
				{$L.buttons.contact()}
			</a>
			<a
				rel="external"
				data-sveltekit-reload
				href={SIGNUP}
				class={buttonCn({
					cs: 'w-32',
					variant: 'outline',
				})}
			>
				{$L.buttons.signup()}
			</a>
		</div>
	</div>
</div>
