import { expect } from '@playwright/test';
import * as R from 'remeda';

import { PostUrl } from '../../../../../../utils/post-url';
import { test } from '../../../../api-fixtures';

import type { ExpenseCategoryDto } from '../../../../../../types/api';

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
	const url = PostUrl(org.organization.id).expenseCategory;

	const all = (await (await request.get(url)).json()) as ExpenseCategoryDto[];

	const proposed = all.map((c) => {
		if (c.id === expenseCategory.id) {
			return c;
		} else {
			return {
				...c,
				labelEn: 'updated',
				// labelAr: 'تحديث',
				labelAr: null,
				parentId: expenseCategory.id,
			};
		}
	});

	const res = await request.patch(url, {
		data: proposed.map((c) => R.omit(c, ['isGroup'])),
	});

	expect(res.status()).toBe(200);

	const updated = (await res.json()) as ExpenseCategoryDto[];

	expect(updated).toEqual(proposed);
});
