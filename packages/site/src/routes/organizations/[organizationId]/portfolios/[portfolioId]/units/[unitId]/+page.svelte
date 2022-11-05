<script lang="ts">
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import { kwdFormat } from '$lib/utils/common';
	import type { PageData } from './$types';

	export let data: PageData;

	$: details = [
		...(data.unit.label ? [['Label', data.unit.label]] : []),
		['Unit Number', data.unit.unitNumber],
		['Type', data.unit.type],
		['Market Rent', kwdFormat(data.unit.marketRent)],
		['Usage', data.unit.usage],
	] as [string, string | null][];
</script>

<DetailsPane {details} />
