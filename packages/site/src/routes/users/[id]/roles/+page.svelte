<script lang="ts">
	import RoleList from '$lib/components/role/RoleList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<RoleList roles={data.user.roles} />
