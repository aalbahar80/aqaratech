<script lang="ts">
	import LeasesCard from '$components/LeasesCard.svelte';
	import TenantDetail from '$components/TenantDetail.svelte';
	import TrxColumn from '$components/TrxColumn.svelte';
	import type { TenantBrowse } from '$lib/definitions/select';
	import flatten from 'lodash-es/flatten';
	import map from 'lodash-es/map.js';
	import type { Jsonify } from 'type-fest';

	export let data: Jsonify<TenantBrowse>;
</script>

<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
<div class="mx-auto flex max-w-6xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<TenantDetail tenant={data} />
	<LeasesCard leases={data.leases} />
	<TrxColumn transactions={flatten(map(data.leases, 'transactions'))} />
</div>
