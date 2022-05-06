<script lang="ts" context="module">
	import { trpc } from '$lib/client/trpc';
	import UnitPage from '$lib/components/unit/UnitPage.svelte';
	import type { Props } from '$lib/models/types/Props.type';
	import type { LoadInput } from '@sveltejs/kit';

	export const load = async ({
		params,
		session,
	}: LoadInput<{ id: string }>) => {
		const unit = session.authz?.isAdmin
			? await trpc().query('units:read', params.id)
			: await trpc().query('owner:units:read', params.id);
		return { props: { unit } };
	};
</script>

<script lang="ts">
	type Unit = Props<typeof load>['unit'];
	export let unit: Unit;
</script>

<UnitPage {unit} />
