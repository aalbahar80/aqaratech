<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<pre>{JSON.stringify(data.units.results, null, 2)}</pre>
<!-- <pre>{JSON.stringify(data.abc, null, 2)}</pre> -->
