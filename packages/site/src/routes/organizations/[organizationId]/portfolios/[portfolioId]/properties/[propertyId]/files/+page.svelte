<script lang="ts">
	import FileList from '$lib/components/file/FileList.svelte.svelte';
	import type { PageData } from './types';

	export let data: PageData;
</script>

<pre>{JSON.stringify(data.files, null, 2)}</pre>

<FileList files={data.files} />
