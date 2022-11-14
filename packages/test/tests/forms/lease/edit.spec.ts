import { expect } from '@playwright/test';
import { leaseFactory } from '@self/seed';
import { PageType } from '@self/utils';
import * as R from 'remeda';
import { test } from '../../api/api-fixtures';
import { FormPage } from '../form-page-model';

const entity = 'lease';
const pageType = PageType.Edit;

test('can be submitted with minimal fields', async ({
	org,
	portfolio,
	lease,
	page,
}) => {
	const fields = R.pick(
		leaseFactory.build({
			organizationId: '',
			portfolioId: '',
			tenantId: '',
			unitId: '',
		}),
		['start', 'end', 'monthlyRent'],
	);

	const formPage = new FormPage(page, {
		entity,
		pageType,
		id: lease.id,
		fixtures: { org, portfolio },
	});

	await formPage.goto();
	await formPage.fillForm(fields);
	await formPage.save();

	await expect(page).toHaveURL(formPage.getSuccessUrl());
});

test.fixme(
	'can be submitted with all fields',
	async ({ org, portfolio, lease, page }) => {
		const fields = R.pick(
			leaseFactory.build({
				organizationId: '',
				portfolioId: '',
				propertyId: '',
			}),
			[
				'leaseNumber',
				'bed',
				'bath',
				'size',
				'marketRent',
				'floor',
				'label',
				'type',
				'usage',
			],
		);

		const formPage = new FormPage(page, {
			entity,
			pageType,
			id: lease.id,
			fixtures: { org, portfolio },
		});
		await formPage.goto();
		await formPage.fillForm(fields);
		await formPage.save();

		await expect(page).toHaveURL(formPage.getSuccessUrl());
	},
);
