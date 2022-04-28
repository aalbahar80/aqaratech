import { describe, expect, test } from 'vitest';
import * as utils from './currency';

describe('utils.inWords', () => {
	test('it returns amount in words in KWD', () => {
		const result: any = utils.inWords(2);
		expect(result).toBe('فقط ٱثنين دينار كويتي لا غير');
	});
});
