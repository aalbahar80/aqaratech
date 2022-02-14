<script lang="ts">
	const items: { id: number }[] = new Array(20).fill({ id: 2 });
</script>

<ul class="space-y-3">
	{#each items as item}
		<li
			key={item.id}
			class="overflow-hidden rounded-md bg-white px-6 py-4 shadow"
		>
			{'Lease card'}
		</li>
	{/each}
</ul>
