import { expect } from '@playwright/test';
import { expenseCategoryFactory } from '@self/seed';
import * as R from 'remeda';
import { PostUrl } from '../../../../../utils/post-url';
import { test } from '../../../api-fixtures';

const categories = Array.from({ length: 3 }, () =>
	expenseCategoryFactory.build(),
);

test.use({
	expenseCategoryParams: {
		isGroup: true,
	},
});

test('can update tree in own org', async ({
	request,
	org,
	expenseCategory,
}) => {
	console.log({ expenseCategory }, 'update-tree.spec.ts ~ 22');
	const url = PostUrl(org.organization.id).expenseCategory;

	await Promise.all(
		categories.map((category) =>
			request.post(url, { data: R.omit(category, ['id']) }),
		),
	);

	const res = await request.patch(url, {
		data: categories.map((category) => ({
			...category,
			isGroup: undefined,
			parentId: expenseCategory.id,
		})),
	});

	expect(res.status()).toBe(200);
});
