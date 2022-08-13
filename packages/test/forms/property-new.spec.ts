import { expect } from "@playwright/test";
import { test } from "../config";

test("smoke", async ({ page }, info) => {
	await page.goto("/");
	await page.locator('a:has-text("Properties")').click();
	await expect(page).toHaveURL("http://localhost:3000/properties");

	await page.locator("text=Create new property").click();
	await expect(page).toHaveURL("http://localhost:3000/properties/new");

	// fill form

	// portfolio
	await page.locator('input:below(:text("Portfolio"))').first().click();
	await page.locator("div:nth-child(1) > .relative").first().click();
	await page.locator("li >> nth=0").first().click();

	await page.locator('input:below(:text("Area"))').first().click();
	await page.locator("text=Nuzha | النزهة").click();

	await page.locator('input[name="block"]').click();
	await page.locator('input[name="block"]').fill("2");
	await page.locator('input[name="avenue"]').click();
	await page.locator('input[name="avenue"]').fill("3");
	await page.locator('input[name="street"]').click();
	await page.locator('input[name="street"]').fill("4");
	await page.locator('input[name="number"]').click();
	await page.locator('input[name="number"]').fill("5");
	await page.locator('input[name="label"]').click();
	await page.locator('input[name="label"]').fill("myproperty");

	await page.locator("text=Save").click();

	const id = new RegExp(
		`/properties/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}`
	);
	await expect(page).toHaveURL(id);
	const url = page.url();

	// take screenshot
	expect(page.locator("text=property")).toBeTruthy();
	await page.locator("#detailsPane").screenshot({
		path: info.snapshotDir + `/property-${info.snapshotSuffix}.png`,
	});

	await page.locator("text=Edit").click();
	const edit = new RegExp(
		`/properties/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/edit`
	);
	await expect(page).toHaveURL(edit);
	await page.locator("text=Save").click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	// match screenshot
	expect(page.locator("text=property")).toBeTruthy();
	expect(await page.locator("#detailsPane").screenshot()).toMatchSnapshot({
		name: "property.png",
	});
});
