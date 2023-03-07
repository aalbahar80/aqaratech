import { organizationSchema } from '@self/utils';

import type { OrganizationDto } from '$api/openapi';

import { createFormField } from '$lib/components/form/model/form-field';
import { createFormModel } from '$lib/components/form/model/form-model';
import { labelHint } from '$lib/constants/form-hints';

export const organizationFormModel = () =>
	createFormModel({
		entity: 'organization',

		createSchema: organizationSchema,
		updateSchema: organizationSchema,
		fields: {
			fullName: createFormField('fullName', {
				required: true,
			}),

			label: createFormField('label', {
				hint: labelHint(),
			}),

			// @ts-expect-error nested field
			months: createFormField(MONTHS_KEY, {
				type: 'number',
				label: 'Due duration (months)',
				hideWhenCreate: true,
				getValue: (data) =>
					(data as OrganizationDto).settings?.dueDuration.months,
			}),

			days: createFormField(DAYS_KEY, {
				type: 'number',
				label: 'Due duration (days)',
				hideWhenCreate: true,
				getValue: (data) =>
					(data as OrganizationDto).settings?.dueDuration.days,
			}),
		},
	});

export const MONTHS_KEY = 'settings.dueDuration.months';
export const DAYS_KEY = 'settings.dueDuration.days';
