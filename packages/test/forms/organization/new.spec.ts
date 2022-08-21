import { expect } from "@playwright/test";
import { test } from "../../config";

test("existing user can create new org", async ({ page }) => {
	await page.goto("/");

	// wait a bit for dropdown to load
	await new Promise((resolve) => setTimeout(resolve, 1000));

	await page.locator("data-testid=dropdown-menu").click();
	await page.locator("text=Switch Role").click();
	await page.locator("text=Create new Organization").click();
	await expect(page).toHaveURL("http://localhost:3000/organizations/new");
	await new Promise((resolve) => setTimeout(resolve, 1000)); // hydration (used sveltekit:reload)

	const name = getName();
	await page.locator('input[name="fullName"]').fill(name);
	await page.locator('input[name="label"]').fill("newOrg");
	await page.locator("text=Save").click();

	const locator = page.locator(`text=${name}`);
	await expect(locator).toBeVisible();
});

test("can be submitted", async ({ page }) => {
	await page.goto("/organizations/new");

	const name = getName();
	await page.locator('input[name="fullName"]').fill(name);
	await page.locator('input[name="label"]').fill("Org 2");
	await page.locator("text=Save").click();

	const locator = page.locator(`text=${name}`);
	await expect(locator).toBeVisible();
});

const getName = () => {
	const random = Math.random().toString(36).substring(7);
	return `Test Organization ${random}`;
};
