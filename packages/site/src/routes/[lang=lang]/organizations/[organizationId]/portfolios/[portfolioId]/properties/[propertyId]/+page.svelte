<script lang="ts">
	import type { PageData } from './$types';

	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';

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
