import { expect } from '@playwright/test';
import * as R from 'remeda';

import { leasePartialFactory } from '@self/seed';
import { FIELDS, getLabel, getRoute, PageType } from '@self/utils';

import { uuid } from '../../../utils/uuid';
import { test } from '../../api/api-fixtures';
import { Combobox } from '../combobox-model';
import { FormPage } from '../form-page-model';

const entity = 'lease';
const pageType = PageType.New;

const NAMES = ['Alex Anderson', 'Zachary Zane'] as const;

test.use({
	tenantsParams: [
		...R.times(200, () => ({})),
		{ fullName: NAMES[0] },
		{ fullName: NAMES[1] },
	],
});

for (const name of NAMES) {
	test(`tenant combobox can be searched for: ${name}`, async ({
		org,
		portfolio,
		tenants: _tenants,
		unit,
		page,
	}) => {
		const lease = R.pick(leasePartialFactory(), FIELDS.lease.required);

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

		await formPage.fillForm(lease);

		const input = new Combobox({ page, key: getLabel('tenantId') });

		await input.fill({ label: name });

		await formPage.save();

		await formPage.verifyDetails({
			...lease,
			tenant: name,
		});
	});
}
