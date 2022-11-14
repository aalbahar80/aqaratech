<script lang="ts">
	import { dev } from '$app/environment';

	export let data: unknown = undefined;
</script>

{#if dev}
	<div class="prose py-6"><pre>{JSON.stringify(data, null, 2)}</pre></div>
{/if}
