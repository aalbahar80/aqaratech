<script context="module" lang="ts">
	import trpc from '$lib/client/trpc';
	import UnitsList from '$lib/components/unit/UnitsList.svelte';
	import type { Props } from '$models/types/Props.type';

	export const load = async ({ session }: { session: App.Session }) => {
		const { data: units, pagination } = session.authz?.isAdmin
			? await trpc.query('units:list', {})
			: await trpc.query('owner:units:list', {
					clientId: session.authz?.id,
			  });

		return {
			props: { units },
		};
	};
</script>

<script lang="ts">
	type Units = Props<typeof load>['units'];
	export let units: Units;
</script>

<UnitsList {units} />
