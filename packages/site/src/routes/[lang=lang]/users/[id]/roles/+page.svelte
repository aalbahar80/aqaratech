<script lang="ts">
	import type { PageData } from './$types';

	import RoleList from '$lib/components/role/RoleList.svelte';

	export let data: PageData;
</script>

<RoleList roles={data.roles} />
