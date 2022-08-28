<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { api } from '$lib/client/api';
	import Form from '$lib/components/form/Form.svelte';
	import { Field } from '$lib/models/classes/Field.class';
	import type { PredefinedPayout } from '$lib/models/interfaces/predefined.interface';
	import {
		OrganizationIdField,
		PortfolioIdField,
	} from '$lib/utils/form/common-fields';
	import { createSchema } from '$models/schemas/payout.schema';
	import { entitiesMap } from '@self/utils';

	export let predefined: PredefinedPayout;

	const basicFields = [
		OrganizationIdField($page.data.user?.role?.organizationId),
		PortfolioIdField(predefined.portfolioId),
		new Field('amount', {
			required: true,
			type: 'number',
		}),
		new Field('postAt', {
			required: true,
			type: 'date',
			value: new Date().toISOString().split('T')[0],
			label: 'Post Date',
		}),
	];
</script>

<Form
	schema={createSchema}
	entity="payout"
	formType="create"
	{basicFields}
	onSubmit={(values) =>
		api($page.data.apiConfig).payouts.create({ createPayoutDto: values })}
	onSuccess={() =>
		goto(`/${entitiesMap.portfolio.urlName}/${predefined.portfolioId}`)}
/>
