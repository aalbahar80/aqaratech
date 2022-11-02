<script lang="ts">
	import UnitForm from '$lib/components/unit/UnitForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<UnitForm data={data.unit} formType="update" />
