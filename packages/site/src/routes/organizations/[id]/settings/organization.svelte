<script lang="ts" context="module">
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ params, stuff }: LoadEvent<{ id: string }>) => {
		const id = params.id;
		const [organization, roles] = await Promise.all([
			stuff.api!.organizations.findOne({ id }),
			stuff.api!.organizations.findRoles({ id }),
		]);

		return { props: { organization, roles } };
	};
</script>

<script lang="ts">
	import OrganizationPage from '$lib/components/organization/OrganizationPage.svelte';

	type Prop = LP<typeof load>;
	export let organization: Prop['organization'];
	export let roles: Prop['roles'];
</script>

<OrganizationPage {organization} {roles} />
