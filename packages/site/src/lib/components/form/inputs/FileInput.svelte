<script lang="ts">
	const uploadFile = (e: Event) => {
		console.log({ e }, 'FileInput.svelte ~ 4');
		// const file = e.target?.files[0];
		// debugger;
	};
	let files: FileList = [];
	$: console.log(files);
</script>

<input
	id="file-upload"
	name="file-upload"
	type="file"
	class="sr-only"
	bind:files
/>
