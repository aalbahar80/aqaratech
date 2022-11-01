<script lang="ts">
	import type { GroupByMonthDto } from '$api/openapi';

	export let title: string;
	export let data: GroupByMonthDto[];
</script>

<!-- Net -->
<h2>{title}</h2>

<p>This month:</p>
<pre>{JSON.stringify(data[0], null, 2)}</pre>

<p>Last month:</p>
<pre>{JSON.stringify(data[1], null, 2)}</pre>
