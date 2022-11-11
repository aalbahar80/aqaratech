<script lang="ts">
	import UnitsList from '$lib/components/unit/UnitsList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<UnitsList units={data.units} />
