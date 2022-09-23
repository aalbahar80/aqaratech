import { testOrgRoleId } from '@self/seed';
import { expect, test } from '../token';

test.use({
	extraHTTPHeaders: {
		'x-role-id': testOrgRoleId,
	},
});

test.skip('cannot assign expense to non-leaf node category', async ({
	request,
	token,
}) => {});

test.skip('can assign expense to leaf node category', async ({
	request,
	token,
}) => {});
