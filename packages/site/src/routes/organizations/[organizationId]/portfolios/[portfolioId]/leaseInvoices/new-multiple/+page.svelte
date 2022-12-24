<script lang="ts">
	import type { PageData } from './$types';

	import Schedule from '$lib/components/lease/Schedule.svelte';

	export let data: PageData;
</script>

<Schedule lease={data.lease} />
