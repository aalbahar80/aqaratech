<script lang="ts">
	import MemberTable from '$lib/components/member/MemberTable.svelte';

	import type { PaginatedRoleDto } from '$api/openapi';
	import type { Entity } from '@self/utils';

	export let data: PaginatedRoleDto;
	export let predefined: {
		relationKey: Extract<Entity, 'organization' | 'portfolio' | 'tenant'>;
		relationValue: string;
	};
</script>

<MemberTable {data} {predefined} />
