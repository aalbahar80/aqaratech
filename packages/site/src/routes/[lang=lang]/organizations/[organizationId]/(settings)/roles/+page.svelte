<script lang="ts">
	import type { PageData } from './$types';

	import MemberTab from '$lib/components/member/MemberTab.svelte';

	export let data: PageData;
</script>

<MemberTab
	data={data.roles}
	predefined={{
		relationKey: 'organization',
		relationValue: data.organization.id,
	}}
/>
