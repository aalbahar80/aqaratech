<script lang="ts">
	import type { RoleTypeEnum } from '$api/openapi';

	import { page } from '$app/stores';

	export let roles: RoleTypeEnum[];
</script>

{#if $page.data.user?.role && roles.includes($page.data.user.role.roleType)}
	<slot />
{/if}
