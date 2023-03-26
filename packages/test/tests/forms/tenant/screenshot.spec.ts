import { expect } from '@playwright/test';

import { getRoute, PageType } from '@self/utils';

import { prisma } from '../../../prisma';
import { assertUneditedForm } from '../../../utils/matchers/unedited-form';
import { test } from '../../api/api-fixtures';

test('screenshot smoke test', async ({ page, org, tenant }) => {
	const url = getRoute({
		entity: 'tenant',
		pageType: PageType.Id,
		id: tenant.id,
		params: { organizationId: org.organization.id },
	});

	const original = await prisma.tenant.findUniqueOrThrow({
		where: { id: tenant.id },
	});

	const edit = getRoute({
		entity: 'tenant',
		pageType: PageType.Edit,
		id: tenant.id,
		params: { organizationId: org.organization.id },
	});

	await page.goto(edit);

	await expect(page).toHaveURL(edit);

	await page.getByRole('button', { name: 'Save' }).click();

	// ensure same entity
	await expect(page).toHaveURL(url);

	const latest = await prisma.tenant.findUniqueOrThrow({
		where: { id: tenant.id },
	});

	assertUneditedForm(original, latest);
});
