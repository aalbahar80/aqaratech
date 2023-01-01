<script lang="ts">
	export let errors: string[] | undefined = undefined;
</script>

{#if errors}
	<ul class="list-inside list-disc space-y-2 p-4 text-sm text-red-600">
		{#each errors as error}
			<li>{error}</li>
		{/each}
	</ul>
{/if}
