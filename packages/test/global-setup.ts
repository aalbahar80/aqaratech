import { chromium, type FullConfig } from '@playwright/test';

import { Cookie } from '@self/utils';

import { testUsers } from './tests/api/fixtures/users/test-users';
import { LoginPage } from './tests/auth/login-page';
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

	const browser = await chromium.launch();

	for (const {
		roleType,
		email,
		password,
		storageStatePath,
		storageStateFilename,
	} of [
		testUsers.orgAdmin,
		testUsers.portfolio,
		testUsers.tenant,
		testUsers.freshUser,
		testUsers.aqaratechStaff,
	]) {
		console.log(`Checking auth cookies for user.roletype: ${roleType}...`);

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

		const loginPage = new LoginPage(page);

		await loginPage.goto();
		await loginPage.fill({ email, password });

		// Save cookies
		await page.context().storageState({ path: storageStatePath });
	}

	await browser.close();
}

export default globalSetup;
