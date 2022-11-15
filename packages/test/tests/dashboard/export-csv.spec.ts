import { Cookie, getRoute, PageTypePortfolio } from '@self/utils';
import { test } from '../api/api-fixtures';

test.use({
	roleParams: {
		roleType: 'PORTFOLIO',
	},

	// A page with a role cookie of a portfolio user
	page: async ({ browser, context, role }, use) => {
		const portfolioContext = await browser.newContext();

		const staleRoleCookie = (await context.cookies()).find(
			(cookie) =>
				cookie.name === Cookie.role ||
				cookie.name === Cookie.accessToken ||
				cookie.name === Cookie.idToken,
		);

		if (!staleRoleCookie) throw new Error('role cookie is not set');

		const cookie = {
			...staleRoleCookie,
			value: role.id,
			name: Cookie.role,
		};

		await portfolioContext.addCookies([cookie]);

		const portfolioPage = await portfolioContext.newPage();

		await use(portfolioPage);

		await portfolioPage.close();
	},
});

test('can export csv from expenses table', async ({
	page: portfolioPage,
	org,
	portfolio,
}) => {
	const url = getRoute({
		entity: 'portfolio',
		id: portfolio.id,
		pageType: PageTypePortfolio.Summary,
		params: { organizationId: org.organization.id, portfolioId: portfolio.id },
	});

	await portfolioPage.goto(url);

	await portfolioPage.getByRole('link', { name: 'Income' }).click();
	// await page.getByRole('link', { name: 'Expenses' }).click();

	await portfolioPage.getByRole('link', { name: 'Table' }).click();

	await portfolioPage.getByRole('button', { name: 'Options' }).click();

	const [download] = await Promise.all([
		portfolioPage.waitForEvent('download'),
		portfolioPage.getByRole('link', { name: 'Export to CSV' }).click(),
	]);

	const csv = await download.saveAs('expenses.csv');

	// console.log(csv);
});
