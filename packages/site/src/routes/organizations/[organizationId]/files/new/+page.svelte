<script lang="ts">
	import FileForm from '$lib/components/file/FileForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<FileForm relationKey={data.relationKey} relationValue={data.relationValue} />
