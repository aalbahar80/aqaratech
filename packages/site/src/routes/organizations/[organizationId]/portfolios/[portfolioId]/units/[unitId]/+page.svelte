<script lang="ts">
	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';
	import type { PageData } from './$types';

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
