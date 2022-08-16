import { expect } from "@playwright/test";
import { sample } from "@self/seed";
import { entitiesMap } from "@self/utils";
import { test } from "../../config";

const tenant = sample.tenants[0];
const portfolio = sample.portfolios[0];
const property = sample.properties[0];
const unit = sample.units[0];

const url = `/${entitiesMap.lease.urlName}/new?tenantId=${tenant.id}&portfolioId=${portfolio.id}&propertyId=${property.id}&unitId=${unit.id}`;

test("tenant is preselected", async ({ page }) => {
	await page.goto(url);
	const el = page.locator("#tenantId");
	await expect(el).toHaveValue(tenant.fullName);
	await expect(el).toHaveAttribute("data-value", tenant.id);
});

test("portfolio is preselected", async ({ page }) => {
	await page.goto(url);
	const el = page.locator("#portfolioId");
	await expect(el).toHaveValue(portfolio.fullName);
	await expect(el).toHaveAttribute("data-value", portfolio.id);
});

test("property is preselected", async ({ page }) => {
	await page.goto(url);
	const el = page.locator("#propertyId");
	const re = new RegExp(`${property.area}`);
	await expect(el).toHaveValue(re);
	await expect(el).toHaveAttribute("data-value", property.id);
});

test("unit is preselected", async ({ page }) => {
	await page.goto(url);
	const el = page.locator("#unitId");
	const num = new RegExp(`${unit.unitNumber}`);
	const type = new RegExp(`${unit.type}`);
	await expect(el).toHaveValue(type);
	await expect(el).toHaveValue(num);
	await expect(el).toHaveAttribute("data-value", unit.id);
});
