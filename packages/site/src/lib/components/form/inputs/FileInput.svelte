<script lang="ts">
	import { page } from '$app/stores';

	const uploadFile = async (e: Event) => {
		const element = e.target as HTMLInputElement | null;
		const file = element?.files?.[0];
		if (!file) return;

		$page.stuff.api.organizations.uploadFile({ file });
	};
</script>

<input
	id="file-upload"
	name="file-upload"
	type="file"
	on:change={uploadFile}
	class="sr-only"
/>
