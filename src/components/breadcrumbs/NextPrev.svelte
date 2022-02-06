<script lang="ts">
	export let path: string;
	export let id: string;
</script>

<div class="flex flex-col items-end">
	<Link href={`/${path}/${+id - 1}`} sveltekit:prefetch>
		<span class="pr-2">Previous</span>
		<ArrowLeft16 />
	</Link>
	<Link href={`/${path}/${+id + 1}`} sveltekit:prefetch>
		<span class="pr-2">Next</span>
		<ArrowRight16 />
	</Link>
</div>
