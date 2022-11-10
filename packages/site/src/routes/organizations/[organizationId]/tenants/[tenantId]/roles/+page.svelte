<script lang="ts">
	import MemberList from '$lib/components/member/MemberList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<MemberList roles={data.roles} />
