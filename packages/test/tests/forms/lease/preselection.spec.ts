import { expect } from '@playwright/test';
import { sample } from '@self/seed';
import { entitiesMap } from '@self/utils';
import { test } from '../../../config';

const tenant = sample.tenants[0];
const portfolio = sample.portfolios[0];
const property = sample.properties[0];
const unit = sample.units[0];
const lease = sample.leases[0];

const url = `/${entitiesMap.lease.urlName}/new?tenantId=${tenant.id}&portfolioId=${portfolio.id}&propertyId=${property.id}&unitId=${unit.id}`;

test('tenant is preselected', async ({ page }) => {
	await page.goto(url);
	const el = page.locator('#tenantId');
	await expect(el).toHaveValue(tenant.label);
	await expect(el).toHaveAttribute('data-value', tenant.id);
});

test('portfolio is preselected', async ({ page }) => {
	await page.goto(url);
	const el = page.locator('#portfolioId');
	await expect(el).toHaveValue(portfolio.label);
	await expect(el).toHaveAttribute('data-value', portfolio.id);
});

test('property is preselected', async ({ page }) => {
	await page.goto(url);
	const el = page.locator('#propertyId');
	const re = new RegExp(`${property.area}`);
	await expect(el).toHaveValue(re);
	await expect(el).toHaveAttribute('data-value', property.id);
});

test('unit is preselected', async ({ page }) => {
	await page.goto(url);
	const el = page.locator('#unitId');
	const num = new RegExp(`${unit.unitNumber}`);
	const type = new RegExp(`${unit.type}`);
	await expect(el).toHaveValue(type);
	await expect(el).toHaveValue(num);
	await expect(el).toHaveAttribute('data-value', unit.id);
});

test('for tenant - create lease button has predefined params', async ({
	page,
}) => {
	await page.goto(`/${entitiesMap.tenant.urlName}/${tenant.id}`);
	const el = page.locator('text=Create new lease');
	await expect(el).toHaveAttribute(
		'href',
		`/${entitiesMap.lease.urlName}/new?tenantId=${tenant.id}`,
	);
});

test('for unit - create lease button has predefined params', async ({
	page,
}) => {
	await page.goto(`/${entitiesMap.unit.urlName}/${unit.id}`);
	const el = page.locator('text=Create new lease');
	await expect(el).toHaveAttribute(
		'href',
		`/${entitiesMap.lease.urlName}/new?portfolioId=${portfolio.id}&propertyId=${property.id}&unitId=${unit.id}`,
	);
});

test('renew lease button has predefined params', async ({ page }) => {
	await page.goto(`/${entitiesMap.lease.urlName}/${lease.id}`);
	const el = page.locator('text=Renew');
	await expect(el).toHaveAttribute(
		'href',
		`/${entitiesMap.lease.urlName}/new?tenantId=${lease.tenantId}&portfolioId=${lease.portfolioId}&propertyId=${unit.propertyId}&unitId=${lease.unitId}`,
	);
});
