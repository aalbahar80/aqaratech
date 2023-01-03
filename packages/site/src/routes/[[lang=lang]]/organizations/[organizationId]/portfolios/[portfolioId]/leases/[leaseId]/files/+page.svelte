<script lang="ts">
	import type { PageData } from './$types';

	import FileTable from '$lib/components/file/FileTable.svelte';

	export let data: PageData;
</script>

<FileTable data={data.files} />
