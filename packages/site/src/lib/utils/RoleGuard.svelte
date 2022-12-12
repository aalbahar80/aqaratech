<script lang="ts">
	import { page } from '$app/stores';

	import type { RoleTypeEnum } from '$api/openapi';

	export let roles: RoleTypeEnum[];
</script>

{#if $page.data.user?.role && roles.includes($page.data.user.role.roleType)}
	<slot />
{/if}
