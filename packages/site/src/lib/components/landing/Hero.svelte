<script lang="ts">
	// eslint-disable-next-line import/no-named-as-default
	import LL from '$i18n/i18n-svelte';
	import { buttonCn } from '$lib/components/landing/button-cn';
	import { LOGIN } from '$lib/constants/routes';

	import UnderlineDecoration from './UnderlineDecoration.svelte';
</script>

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-testid="hero">
	<div class="flex flex-col gap-8 pt-20 pb-16 text-center lg:pt-32">
		<h1
			class="font-display mx-auto max-w-4xl text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl"
		>
			{$LL.landing.hero.titlePrefix()}
			<span class="relative whitespace-nowrap text-blue-600">
				<UnderlineDecoration />
				<span class="relative"> {$LL.landing.hero.titleSuffix()}</span>
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
				rel="noopener noreferrer"
				data-sveltekit-reload
				type="submit"
				class={buttonCn({
					cs: 'w-32',
				})}
			>
				{$LL.buttons.contact()}
			</a>
			<a
				href={LOGIN}
				class={buttonCn({
					cs: 'w-32',
					variant: 'outline',
				})}
			>
				{$LL.buttons.login()}
			</a>
		</div>
	</div>
</div>
