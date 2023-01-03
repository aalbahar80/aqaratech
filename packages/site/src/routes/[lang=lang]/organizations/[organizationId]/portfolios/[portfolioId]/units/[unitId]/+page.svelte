<script lang="ts">
	import type { PageData } from './$types';

	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';

	export let data: PageData;
</script>

<AutoDetailsPane
	details={data.unit}
	keys={[
		'label',
		'unitNumber',
		'usage',
		'bed',
		'bath',
		'floor',
		'size',
		'marketRent',
		'type',
	]}
/>
