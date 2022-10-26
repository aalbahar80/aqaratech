/* eslint-disable @typescript-eslint/no-empty-function */
import { expect } from '@playwright/test';
import { expenseCategoryFactory, sample } from '@self/seed';
import * as R from 'remeda';
import { PostUrl } from '../../../../../../utils/post-url';
import { test } from '../../../../api-fixtures';

const expenseCategory = R.omit(expenseCategoryFactory.build(), ['id']);

test('can create expenseCategory in own org', async ({ request, org }) => {
	const url = PostUrl(org.organization.id).expenseCategory;

	const res = await request.post(url, { data: expenseCategory });

	expect(res.status()).toBe(201);
});

test('cannot create expenseCategory in another org', async ({
	request,
	org: _org,
}) => {
	const url = PostUrl(sample.organizations[0]!.id).expenseCategory;

	const res = await request.post(url, { data: expenseCategory });

	await expect.soft(res).not.toBeOK();

	expect(res.status()).toBe(403); // or 404?
});

// TODO: move to general expense-category tests:

test.fixme('can create group', async () => {});

test.fixme('can create leaf', async () => {});

test.fixme('cannot create leaf with non-existing parent group', async () => {});

test.fixme('cannot create expenses uner non-leaf nodes', async () => {});

test.fixme('can enter expenses under leaf nodes', async () => {});
