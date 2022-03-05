import * as utils from './common';
// @ponicode
describe('utils.getProgress', () => {
	test('it assumes completion on end date', () => {
		const result: any = utils.getProgress(
			new Date('2020-01-01'),
			new Date('2020-01-31'),
			new Date('2020-01-31'),
		);
		expect(result).toBe(100);
	});
	test('assumes a reference date of today', () => {
		const result: any = utils.getProgress(
			new Date('2020-01-01'),
			new Date('2020-01-31'),
		);
		expect(result).toBe(100);
	});
});
