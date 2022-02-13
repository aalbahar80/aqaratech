<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch, params }) => {
		const { entity, id } = params;
		const res = await fetch(`/${entity}/${id}.json`);
		const data = await res.json();
		return {
			props: { data },
		};
	};
</script>

<script lang="ts">
	export let data: any;
</script>

<pre>
  {JSON.stringify(data)}
</pre>
