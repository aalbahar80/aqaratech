<script lang="ts">
	import { goto } from '$app/navigation';
	import FormFields from '$components/form/FormFields.svelte';
	import { addToast } from '$lib/stores/toast';
	import { svelteReporter } from '@felte/reporter-svelte';
	import type { ValidatorConfig } from '@felte/validator-zod';
	import { validator } from '@felte/validator-zod';
	import {
		mutation,
		operationStore,
		type TypedDocumentNode,
	} from '@urql/svelte';
	import { Button } from 'carbon-components-svelte';
	import { createForm } from 'felte';
	import map from 'just-map-values';
	import { onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { z, ZodType } from 'zod';
	import type { Field } from './Field';

	export let mutationDoc: TypedDocumentNode;
	export let subtitle: string;
	export let fieldList: Field[];
	export let url: (id: string) => string;

	type Schema = $$Generic<ZodType<any, any, any>>;
	type PartialSchema = Partial<z.infer<Schema>>;
	export let schema: Schema;
	// export let initialValues: Partial<typeof $data>;
	export let initialValues: PartialSchema;
	export let onMountReset: (touched2: typeof $touched) => void;
	export let moreData: Writable<Partial<typeof $data>>;
	export let validation: (values: PartialSchema) => typeof $errors;

	const {
		form,
		validate,
		data,
		errors,
		touched,
		setTouched,
		reset,
		setInitialValues,
		setField,
	} = createForm<z.infer<typeof schema>, ValidatorConfig>({
		extend: [validator, svelteReporter],
		validateSchema: schema,
		validate: validation,
		onSubmit: async (allValues) => {
			const nullifiedValues = map(allValues, (v) => (v === '' ? null : v));
			const { client_id, property_id, ...values } = allValues;
			const res = await mutation(operationStore(mutationDoc))({
				// TODO dynamic
				object: values,
			});
			addToast({
				props: {
					title: 'Success',
					kind: 'success',
					subtitle: `${subtitle} updated`,
				},
			});
			// TODO reconsider await
			// TODO dynamic
			const id = await res.data?.result?.id;
			await goto(url(id));
			// ...
		},
	});

	$: $data = {
		...$data,
		...$moreData,
	};

	setInitialValues(initialValues);
	onMount(() => {
		onMountReset($touched);
		// wait for 1 second
		setTimeout(() => {
			reset();
		}, 1);
	});
</script>

<div class="max-w-md grid grid-cols-1 gap-8">
	<form use:form>
		<div class="div grid grid-cols-1 gap-y-4">
			<slot data={$data} errors={$errors} {setTouched} {setField} />
			<FormFields {fieldList} />

			<button type="submit">submit</button>
			<Button kind="ghost" on:click={() => console.log($data)}>Debug</Button>
			<Button kind="ghost" on:click={() => console.log($errors)}>Errors</Button>
			<Button kind="ghost" on:click={() => validate()}>Validate</Button>
			<Button kind="ghost" on:click={() => reset()}>reset</Button>
		</div>
	</form>
</div>
