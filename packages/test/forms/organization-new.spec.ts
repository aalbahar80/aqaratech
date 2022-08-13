import { expect } from "@playwright/test";
import { test } from "../config";

test("existing user can create new org", async ({ page }) => {
	page.goto("/");

	// wait a bit for dropdown to load
	await new Promise((resolve) => setTimeout(resolve, 1000));

	await page.locator("data-testid=navbar-dropdown").click();
	await page.locator("text=Switch Role").click();
	await page.locator("text=Create new Organization").click();
	await expect(page).toHaveURL("http://localhost:3000/organizations/new");
	await new Promise((resolve) => setTimeout(resolve, 1000)); // hydration (used sveltekit:reload)

	await page.locator('input[name="fullName"]').fill("My new organization");
	await page.locator('input[name="label"]').fill("newOrg");
	await page.locator("text=Save").click();

	const locator = page.locator("text=My new organization");
	await expect(locator).toBeVisible();
});
