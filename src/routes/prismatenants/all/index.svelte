<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { get, GetAT } from './index.json';
	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/prismatenants/all');
		if (res.ok) {
			const tenants: GetAT = await res.json();
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
	export let tenants;
</script>
