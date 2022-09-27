import { chromium, type FullConfig } from '@playwright/test';
import { testOrgEmail, testPassword } from '@self/seed';
import { getToken } from './utils/get-token';

async function globalSetup(config: FullConfig) {
	const project = config.projects[0];

	if (!project) {
		throw new Error('No project found');
	}
	const { baseURL, storageState, ignoreHTTPSErrors } = project.use;

	if (!baseURL || !storageState || !ignoreHTTPSErrors) {
		throw new Error('Missing config'); // overkill?
	}

	// Avoid logging in again if cookies have not expired
	try {
		const idToken = await getToken({ name: 'idToken', domain: baseURL });
		const accessToken = await getToken({
			name: 'accessToken',
			domain: baseURL,
		});

		if (accessToken && idToken) {
			console.log('[Global Setup] Skipping login and using existing cookies');
			return;
		}
	} catch (e) {
		console.log('[Global Setup] No storageState.json found. Logging in again');
	}

	const email = testOrgEmail;
	const password = testPassword;

	const browser = await chromium.launch();
	const page = await browser.newPage({ ignoreHTTPSErrors });
	await page.goto(baseURL);
	await page.locator('text=Log In >> visible=true').click();
	await page.fill('input[name="username"]', email);
	await page.fill('input[name="password"]', password);
	await page.click('button[name="action"]');
	await page.context().storageState({ path: storageState.toString() });
	await browser.close();
}

export default globalSetup;
