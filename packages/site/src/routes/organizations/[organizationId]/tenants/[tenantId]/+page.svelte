<script lang="ts">
	import type { PageData } from './$types';

	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';

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
