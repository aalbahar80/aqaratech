<script lang="ts">
	import RoleForm from '$lib/components/role/RoleForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<RoleForm predefined={data.predefined} />
