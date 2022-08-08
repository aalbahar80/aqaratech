<script lang="ts">
	// import { listFiles } from '$lib/utils/file-upload';

	const uploadFile = async (e: Event) => {
		// console.log({ e }, 'FileInput.svelte ~ 4');
		const element = e.target as HTMLInputElement | null;
		const file = element?.files?.[0];
		if (!file) return;

		// upload
		// await listFiles();
	};
</script>

<input
	id="file-upload"
	name="file-upload"
	type="file"
	on:change={uploadFile}
	class="sr-only"
/>
