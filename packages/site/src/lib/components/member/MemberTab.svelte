<script lang="ts">
	import type { Entity } from '@self/utils';

	import type { PaginatedRoleDto } from '$api/openapi';

	import MemberTable from '$lib/components/member/MemberTable.svelte';

	export let data: PaginatedRoleDto;
	export let predefined: {
		relationKey: Extract<Entity, 'organization' | 'portfolio' | 'tenant'>;
		relationValue: string;
	};
</script>

<MemberTable {data} {predefined} />
