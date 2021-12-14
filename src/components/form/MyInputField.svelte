<script>
	export let wrap = false;
</script>

{#if wrap}
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="input-group">
		<span class="">+965</span>
		<slot />
	</label>
{:else}
	<slot />
{/if}
