<script lang="ts">
	import FileTable from '$lib/components/file/FileTable.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<FileTable data={data.files} />
