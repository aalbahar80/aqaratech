<script context="module" lang="ts">
	import Login from './login.svelte';

	export const prerender = true;
</script>

<svelte:head>
	<title>Aqaratech Admin</title>
</svelte:head>

<a sveltekit:prefetch class="link" href={`/tenants/3`}>3 fixed</a>
<a sveltekit:prefetch class="link" href={`/tenants/4`}>4 fixed</a>
<a sveltekit:prefetch class="link" href={`/tenants/5`}>5 fixed</a>
<a sveltekit:prefetch class="link" href={`/pholder`}>pholder</a>

<div class="min-h-full hero bg-base-200">
	<div class="text-center hero-content">
		<div class="max-w-md">
			<h1 class="mb-5 text-5xl font-bold">Hello there</h1>
			<p class="mb-5">
				Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
				excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
				id nisi.
			</p>
			<Login />
		</div>
	</div>
</div>
