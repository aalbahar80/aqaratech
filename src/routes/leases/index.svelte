<script lang="ts" context="module">
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import type { Load } from './index';

	export const load: Load = async ({ url }) => {
		const pageIndex = url.searchParams.get('p');
		const [total, { data, pagination }] = await Promise.all([
			trpc.query(`leases:count`),
			trpc.query(`leases:list`, { pageIndex }),
		]);
		return {
			props: { total, pagination, leases: data },
		};
	};
</script>

<script lang="ts">
	import LeaseList from '$lib/components/lease/LeaseList.svelte';

	export let leases: InferQueryOutput<`leases:list`>[`data`];
</script>

<div class="mx-auto flex max-w-4xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<LeaseList {leases} />
</div>
