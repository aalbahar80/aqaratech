import { expect } from '@playwright/test';
import { expenseCategoryFactory, sample } from '@self/seed';
import { randomUUID } from 'crypto';
import * as R from 'remeda';
import { PostUrl } from '../../../../../../utils/post-url';
import { test } from '../../../../api-fixtures';

const updated = R.pick(expenseCategoryFactory.build(), [
	'labelEn',
	'labelAr',
	'description',
]);

test('can update expenseCategory in own org', async ({
	request,
	org,
	expenseCategory,
}) => {
	const url = PostUrl(org.organization.id).expenseCategory;

	const res = await request.patch(`${url}/${expenseCategory.id}`, {
		data: updated,
	});

	expect(res.status()).toBe(200);
});

test('cannot update expenseCategory in another org', async ({
	request,
	org: _org,
	expenseCategory,
}) => {
	const url = PostUrl(sample.organizations[0].id).expenseCategory;

	const res = await request.patch(`${url}/${expenseCategory.id}`, {
		data: updated,
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403);
});

test('cannot update expenseCategory in non-existing org', async ({
	request,
	org: _org,
	expenseCategory,
}) => {
	const url = PostUrl(randomUUID()).expenseCategory;

	const res = await request.patch(`${url}/${expenseCategory.id}`, {
		data: updated,
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403);
});

test('cannot update non-existing expenseCategory', async ({ request, org }) => {
	const url = PostUrl(sample.organizations[0].id).expenseCategory;

	const res = await request.patch(`${url}/${randomUUID()}`, {
		data: updated,
	});

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403);
});
