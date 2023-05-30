<script lang="ts">
	import L, { locale } from '$i18n/i18n-svelte';
	import Container from '$lib/components/landing/secondary-feature/Container.svelte';
	// import TablerBrandInstagram from '~icons/tabler/brand-instagram';
</script>

<footer>
	<Container>
		<div
			class="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-around"
		>
			<!-- <div class="flex gap-x-6"> -->
			<!-- <a href={withLocale('/', $locale)} class="group" aria-label="Aqaratech on Instagram"> -->
			<!-- 	<TablerBrandInstagram -->
			<!-- 		class="h-6 w-6 text-slate-500 group-hover:text-slate-700" -->
			<!-- 		aria-hidden="true" -->
			<!-- 	/> -->
			<!-- </a> -->
			<!-- </div> -->
			<p class="mt-6 text-sm text-slate-500 sm:mt-0">
				&copy; {new Date().toLocaleDateString($locale, {
					year: 'numeric',
				})}
				{$L.landing.footer.legal()}
			</p>
		</div>
	</Container>
</footer>
