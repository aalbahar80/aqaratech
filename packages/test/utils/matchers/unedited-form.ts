/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { expect } from '@playwright/test';
import * as R from 'remeda';

export const assertUneditedForm = (original: unknown, latest: unknown) => {
	return expect
		.soft(R.omit(original, ['updatedAt']))
		.toEqual(R.omit(latest, ['updatedAt']));
};
