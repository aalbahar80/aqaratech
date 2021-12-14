import * as utils from './utils';
// @ponicode
describe('utils.formatDate', () => {
	test('0', () => {
		let result: any = utils.formatDate('01-13-2020');
		expect(result).toBe('Jan 13, 2020');
	});

	test('1', () => {
		let result: any = utils.formatDate('32-01-2020');
		expect(result).toBe('Invalid Date');
	});
});
