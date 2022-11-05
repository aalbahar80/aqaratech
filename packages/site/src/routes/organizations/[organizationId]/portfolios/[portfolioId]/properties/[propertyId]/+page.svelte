<script lang="ts">
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: details = [
		...(data.property.label ? [['Label', data.property.label]] : []),
		['Address', data.property.breadcrumbs.property.label],
		['Area', data.property.area],
		['Block', data.property.block],
		['Avenue', data.property.avenue],
		['Street', data.property.street],
		['Number', data.property.number],
		['Parcel', data.property.parcel],
		['Paci', data.property.paci],
	] as [string, string | null][];
</script>

<DetailsPane {details} />
