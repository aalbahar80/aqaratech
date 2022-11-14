<script lang="ts">
	export let errors: string[] | undefined = undefined;
</script>

{#if errors}
	{#each errors as error}
		<p class="mt-2 text-sm text-red-600">
			{error}
		</p>
	{/each}
{/if}
