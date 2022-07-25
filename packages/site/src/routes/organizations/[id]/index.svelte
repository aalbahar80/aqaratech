<script lang="ts" context="module">
	import OrganizationPage from '$lib/components/organization/OrganizationPage.svelte';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ params, stuff }: LoadEvent<{ id: string }>) => {
		const [organization, roles] = await Promise.all([
			stuff.api!.organizations.findOne({ id: params.id }),
			// TODO handle pagination & default limit
			stuff.api!.organizations.findRoles({ id: params.id }),
		]);

		return { props: { organization, roles } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let organization: Prop['organization'];
	export let roles: Prop['roles'];
</script>

<OrganizationPage {organization} {roles} />
