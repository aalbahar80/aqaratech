import path from 'node:path';

import { chromium, type FullConfig } from '@playwright/test';

import { Cookie } from '@self/utils';

import { testUsers } from './tests/api/fixtures/users/test-users';
import { LoginPage } from './tests/auth/login-page';
import { checkStubbed } from './utils/check-stubbed';
import { getToken } from './utils/get-token';
import { globalStoragePath } from './utils/global-storage-path';

async function globalSetup(config: FullConfig) {
	const project = config.projects[0];

	const isStubbed = await checkStubbed();
	console.log(`[globalSetup] isStubbed: ${isStubbed}`);

	if (!isStubbed) {
		// Throw error if running pay tests without stubbing
		throw new Error('Pay tests should be run with stubbed services');
	}

	if (!project) {
		throw new Error('No project found');
	}
	const { baseURL, storageState, ignoreHTTPSErrors } = project.use;

	if (!baseURL || !storageState || !ignoreHTTPSErrors) {
		throw new Error('Missing config'); // overkill?
	}

	const executablePath = project.use.launchOptions?.executablePath;

	const browser = await chromium.launch({
		...(executablePath ? { executablePath } : {}),
	});

	for (const { email, password, storageStateFilename } of [
		testUsers.orgAdmin,
		testUsers.portfolio,
		testUsers.tenant,
		testUsers.freshUser,
	]) {
		const storagePath = path.join(globalStoragePath, storageStateFilename);

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
				// console.log(
				// 	`[Global Setup] Skipping login and using existing cookies from: ${storagePath}`,
				// );

				continue;
			}
		} catch (e) {
			console.log(
				`[Global Setup] No ${storageStateFilename} found. Logging in again`,
			);
		}

		const page = await browser.newPage({ ignoreHTTPSErrors });

		const loginPage = new LoginPage(page, false);

		await loginPage.goto();
		await loginPage.fill({ email, password });

		// Save cookies
		await page.context().storageState({ path: storagePath });
	}

	await browser.close();
}

export default globalSetup;
