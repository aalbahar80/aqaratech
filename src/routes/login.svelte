<script lang="ts">
	import { onMount } from 'svelte';
	import auth from '$lib/services/auth';
	import { isAuthenticated, user } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import type { Auth0Client } from '@auth0/auth0-spa-js';

	let auth0Client: Auth0Client;

	onMount(async () => {
		auth0Client = await auth.createClient();
		isAuthenticated.set(await auth0Client.isAuthenticated());
		user.set(await auth0Client.getUser());
	});

	function login() {
		auth.loginWithPopup(auth0Client).then(() => {
			goto('/');
		});
	}

	function logout() {
		auth.logout(auth0Client);
	}
</script>

{#if $isAuthenticated}
	<h2>Hey {$user.name}!</h2>
	{#if $user.picture}
		<img src={$user.picture} alt={user.name} />
	{:else}
		<!-- svelte-ignore a11y-img-redundant-alt -->
		<img src="https://source.unsplash.com/random/400x300" alt="Random Photo" />
	{/if}
	<button class="btn btn-primary" on:click={logout}>Logout</button>
{:else}
	<button class="btn btn-primary" on:click={login}>Login</button>
{/if}
