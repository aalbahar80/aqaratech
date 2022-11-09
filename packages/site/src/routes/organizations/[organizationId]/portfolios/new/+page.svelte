<script lang="ts">
	import EnhancedForm from '$lib/components/form/EnhancedForm.svelte';
	import { portfolioFormModel } from '$lib/components/portfolio/portfolio-form-model';
	import type { ActionData } from './$types';

	export let form: ActionData;

	const formModel = portfolioFormModel();
</script>

<EnhancedForm {formModel} {form} />
