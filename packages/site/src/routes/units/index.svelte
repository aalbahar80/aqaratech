<script context="module" lang="ts">
	import UnitsList from '$components/unit/UnitsList.svelte';
	import trpc from '$lib/client/trpc';
	import type { Props } from '$lib/models/types/Props.type';
	import type { LoadInput } from '@sveltejs/kit';

	export const load = async ({ session }: LoadInput) => {
		const { data: units } = session.authz?.isAdmin
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
