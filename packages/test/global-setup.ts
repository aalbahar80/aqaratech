import { chromium, type FullConfig } from '@playwright/test';
import {
	testOrgEmail,
	testPassword,
	testPortfolioEmail,
	testTenantEmail,
} from '@self/seed';
import { Cookie } from '@self/utils';
import { getToken } from './utils/get-token';

const roles = [
	{
		roleType: 'ORGADMIN',
		email: testOrgEmail,
		password: testPassword,
		storageStatePath: 'storage-state/org-admin.json',
		storageStateFilename: 'org-admin.json',
	},
	{
		roleType: 'PORTFOLIO',
		email: testPortfolioEmail,
		password: testPassword,
		storageStatePath: 'storage-state/portfolio.json',
		storageStateFilename: 'portfolio.json',
	},
	{
		roleType: 'TENANT',
		email: testTenantEmail,
		password: testPassword,
		storageStatePath: 'storage-state/tenant.json',
		storageStateFilename: 'tenant.json',
	},
];

async function globalSetup(config: FullConfig) {
	const project = config.projects[0];

	if (!project) {
		throw new Error('No project found');
	}
	const { baseURL, storageState, ignoreHTTPSErrors } = project.use;

	if (!baseURL || !storageState || !ignoreHTTPSErrors) {
		throw new Error('Missing config'); // overkill?
	}

	const browser = await chromium.launch();

	for (const {
		roleType,
		email,
		password,
		storageStatePath,
		storageStateFilename,
	} of roles) {
		console.log(`Checking auth cookies for roletype: ${roleType}...`);

		// Avoid logging in again if cookies have not expired
		try {
			const idToken = await getToken(
				{ name: Cookie.idToken, domain: baseURL },
				storageStateFilename,
			);

			const accessToken = await getToken(
				{
					name: Cookie.accessToken,
					domain: baseURL,
				},
				storageStateFilename,
			);

			if (accessToken && idToken) {
				console.log(
					`[Global Setup] Skipping login and using existing cookies from: ${storageStatePath}`,
				);

				continue;
			}
		} catch (e) {
			console.log(
				`[Global Setup] No ${storageStateFilename} found. Logging in again`,
			);
		}

		const page = await browser.newPage({ ignoreHTTPSErrors });
		await page.goto(baseURL);
		await page.locator('text=Log In >> visible=true').click();
		await page.fill('input[name="username"]', email);
		await page.fill('input[name="password"]', password);
		await page.click('button[name="action"]');
		await page.context().storageState({ path: storageStatePath });
	}

	await browser.close();
}

export default globalSetup;
