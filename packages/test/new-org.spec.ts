import { test, expect } from "@playwright/test";

test.use({ storageState: "./storageState.json" });
test("existing user can create new org", async ({ page }) => {
	page.goto("/");
	await page
		.locator('button:has-text("Pfeffer - Herman Organization")')
		.click();

	// Click text=Switch Role
	await page.locator("text=Switch Role").click();
	await expect(page).toHaveURL(
		"http://localhost:3000/users/3e70ffbc-9fdd-4191-9400-d937e7072b72/roles"
	);

	// Click text=Create new Organization
	await page.locator("text=Create new Organization").click();
	await expect(page).toHaveURL("http://localhost:3000/organizations/new");

	// Click input[name="fullName"]
	await page.locator('input[name="fullName"]').click();

	// Fill input[name="fullName"]
	await page.locator('input[name="fullName"]').fill("My new organization");

	// Click input[name="label"]
	await page.locator('input[name="label"]').click();

	// Fill input[name="label"]
	await page.locator('input[name="label"]').fill("newOrg");

	// Click text=Create new
	await page.locator("text=Create new").click();
	await expect(page).toHaveURL("http://localhost:3000/");

	// Click button:has-text("My new organization Organization")
	await page
		.locator('button:has-text("My new organization Organization")')
		.click();

	// Click button:has-text("My new organization Organization")
	await page
		.locator('button:has-text("My new organization Organization")')
		.click();
});
