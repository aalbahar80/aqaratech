import { getMonths } from './group';

describe('Grouping a list of transactions', () => {
	test('the sum of the output equals the sum of the inputs', () => {
		// Test unordered dates, test unordered isPaid, test negative amounts
		const data = [
			{ postDate: new Date(Date.UTC(2020, 0, 2)), amount: 400, isPaid: false },
			{ postDate: new Date(Date.UTC(2020, 0, 1)), amount: 100, isPaid: true },
			{ postDate: new Date(Date.UTC(2020, 1, 1)), amount: 200, isPaid: true },
			{ postDate: new Date(Date.UTC(2020, 0, 2)), amount: 300, isPaid: true },
			{ postDate: new Date(Date.UTC(2020, 3, 2)), amount: 400, isPaid: true },
			{ postDate: new Date(Date.UTC(2020, 0, 3)), amount: 500, isPaid: true },
			{ postDate: new Date(Date.UTC(2020, 4, 3)), amount: 600, isPaid: true },
		];

		const months = getMonths(data);
		expect(months.length).toBe(5);
	});
});
