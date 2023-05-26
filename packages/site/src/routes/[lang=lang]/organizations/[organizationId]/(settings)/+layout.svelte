<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';

	import OrganizationPage from '$lib/components/organization/OrganizationPage.svelte';
	import OrganizationTabs from '$lib/components/organization/OrganizationTabs.svelte';

	export let data: LayoutData;
</script>

<!-- Expense categories has its own details pane and edit button -->
{#if $page.route.id?.endsWith('organizations/[organizationId]/(settings)')}
	<OrganizationPage organization={data.organization} />
{/if}

<OrganizationTabs />

<slot />
