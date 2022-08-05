import { expect } from "@playwright/test";
import { test } from "../config";

test.use({ storageState: "./storageState.json" });
test("existing user can create new org", async ({ page }) => {
	page.goto("/");

	// wait a bit for dropdown to load
	await new Promise((resolve) => setTimeout(resolve, 1000));

	await page
		.locator('button:has-text("Pfeffer - Herman Organization")')
		.click();
	await page.locator("text=Switch Role").click();
	await expect(page).toHaveURL(
		"http://localhost:3000/users/3e70ffbc-9fdd-4191-9400-d937e7072b72/roles"
	);
	await page.locator("text=Create new Organization").click();
	await expect(page).toHaveURL("http://localhost:3000/organizations/new");
	await page.locator('input[name="fullName"]').click();
	await page.locator('input[name="fullName"]').fill("My new organization");
	await page.locator('input[name="label"]').click();
	await page.locator('input[name="label"]').fill("newOrg");
	await page.locator("text=Create new").click();

	const locator = page.locator(
		'button:has-text("My new organization Organization")'
	);
	await expect(locator).toBeVisible();
});
