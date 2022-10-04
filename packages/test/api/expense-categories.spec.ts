/* eslint-disable */
// @ts-nocheck
import { testOrgRoleId } from '@self/seed';
import { test } from './api-fixtures';

test.use({
	extraHTTPHeaders: {
		'x-role-id': testOrgRoleId,
	},
});

test.skip('cannot assign expense to non-leaf node category', async ({
	request,
}) => {});

test.skip('can assign expense to leaf node category', async ({
	request,
}) => {});
