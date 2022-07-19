<script context="module" lang="ts">
	import TenantList from '$lib/components/tenant/TenantList.svelte';
	import { parseParams } from '$lib/utils/parse-params';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ url, stuff }: LoadEvent) => {
		const { page, take, q } = parseParams(url);
		const data = await stuff.api!.tenants.findAll({
			page,
			take,
			q,
		});

		return {
			props: { data },
		};
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let data: Prop['data'];
</script>

<TenantList tenants={data} />
