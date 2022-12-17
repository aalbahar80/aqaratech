<script lang="ts">
	import { dev } from '$app/environment';

	export let data: unknown = undefined;
</script>

{#if dev}
	<div class="prose w-full place-self-center py-6">
		<pre>{JSON.stringify(data, null, 2)}</pre>
	</div>
{/if}
