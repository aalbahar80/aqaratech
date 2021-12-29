<script lang="ts">
	import { onMount } from 'svelte';
	import auth from '$lib/services/auth';
	import { isAuthenticated, user } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import type { Auth0Client } from '@auth0/auth0-spa-js';
	let auth0Client: Auth0Client;

	onMount(async () => {
		console.log('mounting login');
		auth0Client = await auth.createClient();
		isAuthenticated.set(await auth0Client.isAuthenticated());
		user.set(await auth0Client.getUser());
	});

	async function login() {
		console.log('logging in');
		await auth.loginWithPopup(auth0Client);
		const claims = await auth0Client.getIdTokenClaims();
		console.log(claims);
		goto('/');
	}

	function logout() {
		auth.logout(auth0Client);
	}
</script>

<a href="/">Go Home</a>

{#if $isAuthenticated}
	<h2>Hey {$user.name}!</h2>
	{#if $user.picture}
		<img src={$user.picture} alt={user.name} />
	{:else}
		<img src="https://source.unsplash.com/random/400x300" alt="Random" />
	{/if}
	<button class="btn btn-primary" on:click={logout}>Logout</button>
{:else}
	<button class="btn btn-primary" on:click={login}>Login</button>
{/if}

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="bg-gray-50">
	<div
		class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"
	>
		<h2
			class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
		>
			<span class="block">Ready to dive in?</span>
			<span class="block text-indigo-600">Start your free trial today.</span>
		</h2>
		<div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
			<div class="inline-flex rounded-md shadow">
				<button
					on:click={login}
					class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
				>
					Login
				</button>
			</div>
			<div class="ml-3 inline-flex rounded-md shadow">
				<button
					on:click={() => console.log($isAuthenticated)}
					class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
				>
					Learn more
				</button>
			</div>
		</div>
	</div>
</div>
