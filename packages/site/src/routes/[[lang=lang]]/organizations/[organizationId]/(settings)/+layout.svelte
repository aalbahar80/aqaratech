<script lang="ts">
	import type { LayoutData } from './$types';

	import OrganizationPage from '$lib/components/organization/OrganizationPage.svelte';
	import OrganizationTabs from '$lib/components/organization/OrganizationTabs.svelte';

	export let data: LayoutData;
</script>

<OrganizationPage organization={data.organization} />

<OrganizationTabs />

<slot />
