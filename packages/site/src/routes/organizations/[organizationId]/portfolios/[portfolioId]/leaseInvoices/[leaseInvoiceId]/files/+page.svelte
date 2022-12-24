<script lang="ts">
	import type { PageData } from './$types';

	import FileList from '$lib/components/file/FileList.svelte.svelte';

	export let data: PageData;
</script>

<FileList files={data.files} />
