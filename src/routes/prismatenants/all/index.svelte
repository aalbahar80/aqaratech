<script context="module" lang="ts">
	import { logger } from '$lib/config/logger';
	import type { Load } from '@sveltejs/kit';
	import type { Body } from './index.json';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/prismatenants/all.json');
		if (res.ok) {
			const tenants = (await res.json()) as Body;
			logger.warn({ tenants }, 'index.svelte ~ 9');
			return {
				props: { tenants },
			};
		}

		const { message } = await res.json();

		return {
			error: new Error(message),
		};
	};
</script>

<script lang="ts">
	export let tenants: Body;
</script>

<a href="/">go home</a>
<a href="/prismatenants">go pts</a>
<h1>some header</h1>
<pre>{JSON.stringify(tenants[9].email)}</pre>
