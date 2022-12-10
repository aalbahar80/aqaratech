<script lang="ts">
	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<AutoDetailsPane
	details={data.property}
	keys={[
		'label',
		'area',
		'block',
		'avenue',
		'street',
		'number',
		'parcel',
		'paci',
	]}
/>
