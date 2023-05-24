<script lang="ts">
	import L from '$i18n/i18n-svelte';
</script>

<div class="mx-auto max-w-2xl md:text-center">
	<h2 class="text-3xl tracking-tight text-slate-900 sm:text-4xl">
		{$L.landing.hero.subtitle()}
	</h2>
	<p class="mt-4 text-lg tracking-tight text-slate-700">
		{$L.landing.hero.description()}
	</p>
</div>
