<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { Body } from './index.json';
	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/prismatenants/all');
		if (res.ok) {
			const tenants = (await res.json()) as Body;
			return {
				props: tenants,
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
