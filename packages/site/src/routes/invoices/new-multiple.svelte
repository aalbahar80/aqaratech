<script context="module" lang="ts">
	import { dev } from '$app/env';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/buttons/Button.svelte';
	import Schedule from '$lib/components/lease/Schedule.svelte';
	import { entityNameMap } from '$lib/constants/names';
	import type { PredefinedInvoice } from '$lib/models/interfaces/predefined.interface';
	import { scheduleSchema as schema } from '$lib/models/schemas/lease.schema';
	import { addToast } from '$lib/stores/toast';
	import { generateSchedule } from '$lib/utils/generate-schedule';
	import { ResponseError } from '@self/sdk';
	import type { LoadEvent } from '@sveltejs/kit';
	import { createForm } from 'felte';
	import type { LP } from 'src/types/load-props';
	import type { z } from 'zod';

	export const load = async ({ url, stuff }: LoadEvent) => {
		const predefined: PredefinedInvoice = {
			leaseId: url.searchParams.get('leaseId'),
		};

		const lease = await stuff.api!.leases.findOne({ id: predefined.leaseId });
		return { props: { predefined, lease } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let lease: Prop['lease'];

	$: noErrorMsg = Object.values($errors).every((e) => e === null);

	const {
		form,
		errors,
		isSubmitting,
		data: data2,
		setData,
		isValid,
		unsetField,
	} = createForm<z.infer<typeof schema>>({
		schema,
		// ...(initialValues && { initialValues }), // for fields that do not use the `name` attribute.
		// extend: validator({ schema }),
		onSubmit: async (original) => {
			console.debug({ originalFormValues: original });
			const values = schema.passthrough().parse(original); // let zod handle date parsing ("" to null)
			console.debug({ parsedFormValues: values });

			const value = await $page.stuff.api.leases.createInvoices({
				id: lease.id,
				createLeaseInvoiceDto: values,
			});

			goto(`/${entityNameMap.leases.urlName}/${lease.id}`);
		},

		onError: async (error: any) => {
			let message = '';
			if (error instanceof ResponseError) {
				const data = await error.response.json();
				console.error(data);
				message = data.message;
			}
			addToast({
				props: {
					kind: 'error',
					title: 'Error',
					subtitle: message,
				},
			});
		},
	});

	const handleCountChange = (newCount: number) => {
		const newSchedule = generateSchedule({
			scheduleStart: new Date(lease.start),
			amount: lease.monthlyRent,
			count: newCount,
		});
		// setData(newSchedule);
	};
</script>

<!-- <pre>{JSON.stringify(lease, null, 2)}</pre> -->

<form use:form data-test={$isValid ? 'ok' : 'error'}>
	<!-- schedule={$data2} -->
	<Schedule
		errors={$errors}
		on:delete={(e) => {
			unsetField(`schedule.${e.detail}`);
		}}
		on:countChange={(e) => {
			handleCountChange(e.detail);
		}}
	/>

	<div class="flex flex-shrink-0 justify-end space-x-4 px-4 py-4">
		<Button
			text={'Create'}
			disabled={!noErrorMsg || $isSubmitting}
			loading={$isSubmitting}
		/>
	</div>
</form>

{#if dev}
	<div class="prose py-6"><pre>{JSON.stringify($data2, null, 2)}</pre></div>
	<div class="prose py-6"><pre>{JSON.stringify($errors, null, 2)}</pre></div>
{/if}
