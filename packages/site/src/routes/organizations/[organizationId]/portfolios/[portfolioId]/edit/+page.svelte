<script lang="ts">
	import EnhancedForm from '$lib/components/form/EnhancedForm.svelte';
	import { portfolioFormModel } from '$lib/components/portfolio/portfolio-form-model';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	const formModel = portfolioFormModel();
</script>

<EnhancedForm {form} {formModel} data={data.portfolio} />
