<script lang="ts">
	type Name = $$Generic;
	type GFormField = $$Generic<FormField<Name>>;

	export let formField: GFormField;
	export let value: unknown = undefined;

	let yes = !!value;

	$: console.log(yes);
</script>

<label>
	<input type="checkbox" name={formField.name} bind:checked={yes} />
	Label here
</label>
