<script lang="ts">
	import OrganizationPage from '$lib/components/organization/OrganizationPage.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<OrganizationPage organization={data.organization} roles={data.roles} />
