import * as utils from './currency';
// @ponicode
describe('utils.inWords', () => {
	test('it returns amount in words in KWD', () => {
		const result: any = utils.inWords(2);
		expect(result).toBe('فقط ٱثنين دينار كويتي لا غير');
	});
});
