<script lang="ts">
	import { goto } from '$app/navigation';
	import FormFields from '$components/form/FormFields.svelte';
	import { addToast } from '$lib/stores/toast';
	import { svelteReporter } from '@felte/reporter-svelte';
	import type { ValidatorConfig } from '@felte/validator-zod';
	import { validator } from '@felte/validator-zod';
	import { mutation, operationStore } from '@urql/svelte';
	import { Button } from 'carbon-components-svelte';
	import { createForm } from 'felte';
	import map from 'just-map-values';
	import { onMount } from 'svelte';
	import type { z } from 'zod';
	import type { Field } from './Field';
	import { leaseStore } from '$lib/stores/formStores';
	import { writable, derived } from 'svelte/store';

	export let schema;
	export let initialValues;
	export let mutationDoc;
	export let validation;
	export let url = (id: string): string => `/api/v1/form/${id}`;
	export let fieldList: Field[];
	export let subtitle;
	export let onMountReset = (touched: any): void => {};
	export let cData;
	$: cData = $data;

	$: $leaseStore = $data;
	$: console.log($data);
	// eslint-disable-next-line @typescript-eslint/unbound-method
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

		// transform: (values) => values.map((v) => (v === '' ? null : v)),
		// transform: (values) => map(values, (v) => (v === '' ? null : v)),
		// touchTriggerEvents: { blur: false, change: false, input: false },
		onSubmit: async (allValues) => {
			const nullifiedValues = map(allValues, (v) => (v === '' ? null : v));
			const { client_id, property_id, ...values } = allValues;
			// TODO dynamic
			const res = await mutation(operationStore(mutationDoc))({
				// TODO dynamic
				object: values,
			});
			addToast({
				props: {
					title: 'Success',
					kind: 'success',
					// TODO dynamic
					subtitle: `${subtitle} updated`,
				},
			});
			// TODO reconsider await
			// TODO dynamic
			const id = await res.data?.result?.id;
			await goto(`/${'leases'}/${id?.toString()}`);
			// ...
		},
	});

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
			<!-- <slot {data} {errors} {setTouched} /> -->
			<FormFields {fieldList} />

			<button type="submit">submit</button>
			<Button kind="ghost" on:click={() => console.log($data)}>Debug</Button>
			<Button kind="ghost" on:click={() => console.log($errors)}>Errors</Button>
			<Button kind="ghost" on:click={() => validate()}>Validate</Button>
			<Button kind="ghost" on:click={() => reset()}>reset</Button>
		</div>
	</form>
</div>
