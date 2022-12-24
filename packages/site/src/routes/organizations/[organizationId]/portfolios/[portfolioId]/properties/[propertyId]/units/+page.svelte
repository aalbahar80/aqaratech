<script lang="ts">
	import type { PageData } from './$types';

	import UnitTable from '$lib/components/unit/UnitTable.svelte';

	export let data: PageData;
</script>

<UnitTable data={data.units} />
