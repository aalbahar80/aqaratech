import { chromium, type FullConfig } from "@playwright/test";
import { testOrgEmail, testPassword } from "@self/seed";

async function globalSetup(config: FullConfig) {
	// await seed();

	const email = testOrgEmail;
	const password = testPassword;

	const browser = await chromium.launch();
	const page = await browser.newPage();
	await page.goto("http://localhost:3000");
	await page.locator("text=Log In >> visible=true").click();
	await page.fill('input[name="username"]', email);
	await page.fill('input[name="password"]', password);
	await page.click('button[name="action"]');
	await page.context().storageState({ path: "storageState.json" });
	await browser.close();
}

export default globalSetup;
