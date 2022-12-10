<script lang="ts">
	import MemberTab from '$lib/components/member/MemberTab.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<MemberTab
	data={data.roles}
	predefined={{
		relationKey: 'portfolio',
		relationValue: data.portfolio.id,
	}}
/>
