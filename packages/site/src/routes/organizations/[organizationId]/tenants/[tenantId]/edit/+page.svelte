<script lang="ts">
	import TenantForm from '$lib/components/tenant/TenantForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<TenantForm data={data.tenant} />
