<script lang="ts">
	import CondensedTable from '$lib/components/table/CondensedTable.svelte';
	import * as R from 'remeda';
	export let data: any[];

	const keys = R.keys(data[0]);
	const headers = keys.map((key) => ({
		key,
		title: key,
		style: 'regular',
	}));
</script>

<CondensedTable {headers} trxs={data.slice(0, 10)} />
