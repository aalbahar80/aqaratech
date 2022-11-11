<script lang="ts">
	import FileList from '$lib/components/file/FileList.svelte.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<FileList files={data.files} />
