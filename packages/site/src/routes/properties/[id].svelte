<script lang="ts" context="module">
	import { api } from '$lib/client/api';
	import PropertyPage from '$lib/components/property/PropertyPage.svelte';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ fetch, params }: LoadEvent<{ id: string }>) => {
		const data = await api(fetch).properties.findOneProperties({
			id: params.id,
		});
		return { props: { data } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let data: Prop['data'];
</script>

<PropertyPage property={data} />
