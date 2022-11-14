import { expect } from '@playwright/test';
import { leaseFactory } from '@self/seed';
import { getRoute, PageType } from '@self/utils';
import * as R from 'remeda';
import { uuid } from '../../../utils/uuid';
import { test } from '../../api/api-fixtures';
import { ComboboxOption } from '../combobox-model';
import { FormPage } from '../form-page-model';

const entity = 'lease';
const pageType = PageType.New;

test.use({
	tenantsParams: R.times(10, () => ({})),
});

test('can be submitted with minimal fields', async ({
	org,
	portfolio,
	tenants,
	unit,
	page,
}) => {
	const lease = R.pick(
		leaseFactory.build({
			organizationId: '',
			portfolioId: '',
			tenantId: tenants[0].id,
			unitId: '',
		}),
		['start', 'end', 'monthlyRent'],
	);

	const url = getRoute({
		entity,
		pageType,
		predefined: { unitId: unit.id },
		params: {
			portfolioId: portfolio.id,
			organizationId: org.organization.id,
		},
	});

	await page.goto(url);

	const formPage = new FormPage(page);

	await formPage.fillForm({
		...lease,
		tenantId: new ComboboxOption({
			label: tenants[0].fullName,
			value: tenants[0].id,
		}),
	});

	await formPage.save();

	const successUrl = getRoute({
		entity,
		id: ':uuid',
		pageType: PageType.Id,
		params: {
			organizationId: org.organization.id,
			portfolioId: portfolio.id,
		},
	});

	await expect(page).toHaveURL(uuid(successUrl));
});

test.fixme(
	'can be submitted with all fields',
	async ({ org, portfolio, property, page }) => {
		const lease = R.pick(
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

		const url = getRoute({
			entity,
			pageType,
			predefined: { propertyId: property.id },
			params: {
				portfolioId: portfolio.id,
				organizationId: org.organization.id,
			},
		});

		await page.goto(url);

		const formPage = new FormPage(page);

		await formPage.fillForm(lease);
		await formPage.save();

		const successUrl = getRoute({
			entity,
			id: ':uuid',
			pageType: PageType.Id,
			params: {
				organizationId: org.organization.id,
				portfolioId: portfolio.id,
			},
		});

		await expect(page).toHaveURL(uuid(successUrl));
	},
);
