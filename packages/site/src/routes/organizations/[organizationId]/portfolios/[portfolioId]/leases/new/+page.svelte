<script lang="ts">
	import LeaseForm from '$lib/components/lease/LeaseForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<LeaseForm
	formType="create"
	predefined={data.predefined}
	tenants={data.tenants}
	portfolios={data.portfolios}
	properties={data.properties}
	units={data.units}
/>
