import { expect } from '@playwright/test';
import { entitiesMap } from '@self/utils';
import { test } from '../../api/api-fixtures';

// const url = `/${entitiesMap.lease.urlName}/new?tenantId=${tenant.id}&portfolioId=${portfolio.id}&propertyId=${property.id}&unitId=${unit.id}`;

test.fixme(
	'for tenant - create lease button has predefined params',
	async ({ page, tenant }) => {
		await page.goto(`/${entitiesMap.tenant.urlName}/${tenant.id}`);

		const el = page
			.locator('a', {
				has: page.locator('text=New lease'),
			})
			.first();

		await expect(el).toHaveAttribute(
			'href',
			`/leases/new?tenantId=${tenant.id}`,
		);
	},
);

// test('for unit - create lease button has predefined params', async ({
// 	page,
// 	portfolio,
// 	property,
// 	unit,
// }) => {
// 	await page.goto(`/units/${unit.id}`);

// 	// const el = page.locator('text=New lease');
// 	const el = page
// 		.locator('a', {
// 			has: page.locator('text=New lease'),
// 		})
// 		.first();

// 	await expect(el).toHaveAttribute(
// 		'href',
// 		`/leases/new?portfolioId=${portfolio.id}&propertyId=${property.id}&unitId=${unit.id}`,
// 	);
// });

// test('renew lease button has predefined params', async ({ page }) => {
// 	await page.goto(`/${entitiesMap.lease.urlName}/${lease.id}`);
// 	const el = page.locator('text=Renew');
// 	await expect(el).toHaveAttribute(
// 		'href',
// 		`/${entitiesMap.lease.urlName}/new?tenantId=${lease.tenantId}&portfolioId=${lease.portfolioId}&propertyId=${unit.propertyId}&unitId=${lease.unitId}`,
// 	);
// });
