<script lang="ts">
	import Field from '$lib/components/form/Field.svelte';
	import Fields from '$lib/components/form/Fields.svelte';
	import type { FormModel } from '$lib/components/form/form-model';
	import { objectValues } from '$lib/utils/common';

	type T = $$Generic;

	export let form: FormModel<T>;
</script>

<Fields>
	{#each objectValues(form.fields) as formField}
		<Field {formField} />
	{/each}
</Fields>
