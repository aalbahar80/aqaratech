import * as R from 'remeda';

import { expenseCategoryFactory } from '@self/seed';

import { PostUrl } from '../../../utils/post-url';
import { resCheck } from '../../../utils/res-check';

import type { ExpenseCategoryDto } from '../../../types/api';
import type { AllFixtures } from './test-fixtures.interface';

export const expenseCategoryFixtures: AllFixtures = {
	expenseCategoryParams: [undefined, { option: true }],

	expenseCategory: async ({ org, request, expenseCategoryParams }, use) => {
		const expenseCategory = R.omit(
			expenseCategoryFactory.build({
				...expenseCategoryParams,
			}),
			['id'],
		);

		const url = PostUrl(org.organization.id).expenseCategory;

		const res = await request.post(url, { data: expenseCategory });
		resCheck(res);

		const created = (await res.json()) as ExpenseCategoryDto;

		await use(created);
	},
};
