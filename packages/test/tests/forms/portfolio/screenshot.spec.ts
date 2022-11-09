import { expect } from '@playwright/test';
import { getRoute, PageType } from '@self/utils';
import { test } from '../../api/api-fixtures';

test('screenshot smoke test', async ({ page, org, portfolio }, info) => {
	const url = getRoute({
		entity: 'portfolio',
		pageType: PageType.Id,
		id: portfolio.id,
		params: { organizationId: org.organization.id },
	});

	await page.goto(url);

	// take screenshot
	// info.snapshotDir;

	await page.locator('#detailsPane').screenshot({
		path:
			info.snapshotDir +
			`/portfolio-${info.snapshotSuffix}-${info.project.name}.png`,
	});

	await page.locator('text=Edit').click();

	const edit = getRoute({
		entity: 'portfolio',
		pageType: PageType.Edit,
		id: portfolio.id,
		params: { organizationId: org.organization.id },
	});

	await expect(page).toHaveURL(edit);

	await page.locator('text=Save').click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	expect(await page.locator('#detailsPane').screenshot()).toMatchSnapshot({
		name: 'portfolio.png',
	});
});
