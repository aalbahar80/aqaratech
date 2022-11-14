<script lang="ts">
	import FieldError from '$lib/components/form/enhanced/fields/FieldError.svelte';

	export let errors: string[] | undefined = undefined;
</script>

<FieldError {errors} />
