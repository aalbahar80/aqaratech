<script lang="ts">
	import LeaseForm from '$lib/components/lease/LeaseForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<LeaseForm formType="update" data={data.lease} />
