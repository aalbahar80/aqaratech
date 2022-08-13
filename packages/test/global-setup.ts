import { chromium, type FullConfig } from "@playwright/test";
import { testOrgEmail, testPassword } from "@self/seed";
import { cookies } from "./storageState.json";

async function globalSetup(config: FullConfig) {
	// await seed();

	// avoid logging in again if cookies have not expired
	const accessToken = cookies.find((c) => c.name === "accessToken");
	if (accessToken) {
		const hasExpired = accessToken.expires < Date.now() / 1000;

		if (!hasExpired) {
			console.log(
				"[Global Setup] Skipping login because access token is still valid"
			);
			return;
		} else {
			console.log("[Global Setup] Access token has expired. Logging in again");
		}
	}

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
