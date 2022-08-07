<script lang="ts" context="module">
	import RoleList from '$lib/components/role/RoleList.svelte';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ params, stuff }: LoadEvent<{ id: string }>) => {
		const user = await stuff.api!.users.findOne({ id: params.id });
		return { props: { user } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let user: Prop['user'];
</script>

<RoleList roles={user.roles} />
