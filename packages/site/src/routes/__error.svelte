<script context="module" lang="ts">
	import { dev } from '$app/env';
	import type { ResponseError } from '@self/sdk';
	import type { Load } from '@sveltejs/kit';
	import '../styles/tailwind.css';

	export const load: Load = ({ error, status }) => {
		// TODO replace manual type cast with type predicate
		const thrown = error as Error | ResponseError;

		const res = 'response' in thrown ? thrown.response : undefined;
		const code = res?.status ?? status;

		const getTitle = () => {
			if (code === 404) {
				return 'Page not found';
			} else if (code === 403) {
				return 'Forbidden';
			} else if (code === 500) {
				return 'Internal server error';
			} else {
				return 'Unknown error';
			}
		};

		return {
			props: {
				code,
				title: getTitle(),
				message: thrown?.message,
				stack: thrown?.stack,
			},
		};
	};
</script>

<script lang="ts">
	export let code: number;
	export let title: string;
	export let message: string;
	export let stack: string;
</script>

<div
	class="min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8"
>
	<div class="mx-auto max-w-max">
		<main class="sm:flex">
			<p class="text-4xl font-extrabold text-indigo-600 sm:text-5xl">
				{code}
			</p>
			<div class="sm:ml-6">
				<div class="sm:border-l sm:border-gray-200 sm:pl-6">
					<h1
						class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl"
					>
						{title}
					</h1>
					<p class="mt-1 text-base text-gray-500">
						{message}
					</p>
				</div>
				<div
					class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6"
				>
					<a
						href="/"
						class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						Go back home
					</a>
					<!-- <a
						href="#"
						class="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						Contact support
					</a> -->
				</div>
			</div>
		</main>
	</div>
</div>

{#if dev}
	<div class="prose min-h-full min-w-full">
		<pre class="whitespace-pre-wrap">{JSON.stringify(stack, null, 2)}</pre>
	</div>
{/if}
