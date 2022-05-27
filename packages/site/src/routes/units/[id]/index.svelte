<script lang="ts" context="module">
	import { trpc } from '$lib/client/trpc';
	import UnitPage from '$lib/components/unit/UnitPage.svelte';
	import type { Props } from '$lib/models/types/Props.type';
	import type { LoadEvent } from '@sveltejs/kit';

	export const load = async ({
		params,
		session,
		fetch,
	}: LoadEvent<{ id: string }>) => {
		const unit = session.authz?.isAdmin
			? await trpc(fetch).query('units:read', params.id)
			: await trpc(fetch).query('owner:units:read', params.id);
		return { props: { unit } };
	};
</script>

<script lang="ts">
	type Unit = Props<typeof load>['unit'];
	export let unit: Unit;
</script>

<UnitPage {unit} />
