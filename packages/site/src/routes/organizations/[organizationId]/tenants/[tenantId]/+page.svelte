<script lang="ts">
	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<AutoDetailsPane
	details={data.tenant}
	keys={[
		'fullName',
		'label',
		'phone',
		'civilid',
		'dob',
		'nationality',
		'passportNum',
		'residencyNum',
		'residencyEnd',
	]}
/>
