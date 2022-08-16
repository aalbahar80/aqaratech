import { expect } from "@playwright/test";
import { sample } from "@self/seed";
import { entitiesMap } from "@self/utils";
import { test } from "../../config";

const portfolio = sample.portfolios[0];
const property = sample.properties[0];
const unit = sample.units[0];

test("portfolio is preselected", async ({ page }) => {
	await page.goto(
		`/${entitiesMap.unit.urlName}/new?portfolioId=${portfolio.id}&propertyId=${property.id}`
	);
	const el = page.locator("#portfolioId");
	await expect(el).toHaveValue(portfolio.fullName);
	await expect(el).toHaveAttribute("data-value", portfolio.id);
});

test("property is preselected", async ({ page }) => {
	await page.goto(
		`/${entitiesMap.unit.urlName}/new?portfolioId=${portfolio.id}&propertyId=${property.id}`
	);
	const el = page.locator("#propertyId");
	const re = new RegExp(`${property.area}`);
	await expect(el).toHaveValue(re);
	await expect(el).toHaveAttribute("data-value", property.id);
});

test("unitType is preselected", async ({ page }) => {
	await page.goto(`/${entitiesMap.unit.urlName}/${unit.id}/edit`);
	const el = page.locator("#type");
	await expect(el).toHaveValue(unit.type);
});
