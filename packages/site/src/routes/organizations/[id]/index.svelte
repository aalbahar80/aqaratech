<script lang="ts" context="module">
	import OrganizationPage from '$lib/components/organization/OrganizationPage.svelte';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ params, stuff }: LoadEvent<{ id: string }>) => {
		const organization = await stuff.api!.organizations.findOne({
			id: params.id,
		});

		return { props: { organization } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let organization: Prop['organization'];
</script>

<pre>{JSON.stringify(organization, null, 2)}</pre>
<!-- <OrganizationPage {organization} /> -->
