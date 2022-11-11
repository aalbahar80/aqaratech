<script lang="ts">
	import UnitTable from '$lib/components/unit/UnitTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<UnitTable data={data.units} />
