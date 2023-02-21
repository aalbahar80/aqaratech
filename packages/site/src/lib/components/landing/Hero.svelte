<script lang="ts">
	import UnderlineDecoration from './UnderlineDecoration.svelte';

	import L from '$i18n/i18n-svelte';
	import { buttonCn } from '$lib/components/landing/button-cn';
	import { LOGIN } from '$lib/constants/routes';
</script>

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-testid="hero">
	<div class="flex flex-col gap-8 pt-20 pb-16 text-center lg:pt-32">
		<h1
			class="font-display mx-auto max-w-4xl text-3xl font-medium tracking-tight text-slate-900 min-[400px]:text-4xl min-[500px]:text-5xl sm:text-7xl"
		>
			{$L.landing.hero.titlePrefix()}
			<span class="relative whitespace-nowrap text-blue-600">
				<UnderlineDecoration />
				<span class="relative"> {$L.landing.hero.titleSuffix()}</span>
			</span>
		</h1>

		<p class="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
			<!-- Powerful for property managers. Transparent for owners. Convenient for -->
			<!-- tenants. -->
		</p>
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
				href={LOGIN}
				class={buttonCn({
					cs: 'w-32',
					variant: 'outline',
				})}
			>
				{$L.buttons.login()}
			</a>
		</div>
	</div>
</div>
