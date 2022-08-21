<script lang="ts">
	import OrganizationForm from '$lib/components/organization/OrganizationForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<OrganizationForm formType="update" data={data.organization} />
