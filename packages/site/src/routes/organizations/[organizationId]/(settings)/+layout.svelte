<script lang="ts">
	import OrganizationPage from '$lib/components/organization/OrganizationPage.svelte';
	import OrganizationTabs from '$lib/components/organization/OrganizationTabs.svelte';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<OrganizationPage organization={data.organization} />

<OrganizationTabs />

<slot />
