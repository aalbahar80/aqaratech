<script lang="ts">
	import MyInputField from './MyInputField.svelte';

	export let title: string;
	export let required: boolean;
	export let fieldName: string;
	export let value = '';
	export let errors: any;
	export let type;

	const setType = (node: HTMLInputElement) => {
		node.type = type;
	};
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="form-control">
	<label class="label">
		<span class="label-text">{title}{required ? '*' : ''}</span>
	</label>

	<MyInputField wrap={type === 'tel'}>
		<input
			class="flex-grow input input-bordered "
			class:input-warning={errors}
			use:setType
			name={fieldName}
			id={fieldName}
			placeholder={title}
			on:change
			on:blur
			bind:value
		/>
	</MyInputField>

	<label class="label ">
		<span class=" label-text-alt {errors ? 'visible' : 'invisible'}"
			>{errors || 'valid'}</span
		>
	</label>
</div>
