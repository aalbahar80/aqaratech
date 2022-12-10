<script lang="ts">
	import Schedule from '$lib/components/lease/Schedule.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Schedule lease={data.lease} />
