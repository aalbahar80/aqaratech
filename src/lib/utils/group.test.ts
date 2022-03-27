import { groupIncome } from './group';

describe('Grouping a list of transactions', () => {
	test('the sum of the output equals the sum of the inputs', () => {
		// Test unordered dates, test unordered isPaid, test negative amounts
		const data = [
			{ date: new Date(Date.UTC(2020, 0, 2)), amount: 400, isPaid: false },
			{ date: new Date(Date.UTC(2020, 0, 1)), amount: 100, isPaid: true },
			{ date: new Date(Date.UTC(2020, 0, 1)), amount: 200, isPaid: true },
			{ date: new Date(Date.UTC(2020, 0, 2)), amount: 300, isPaid: true },
			{ date: new Date(Date.UTC(2020, 0, 2)), amount: 400, isPaid: true },
			{ date: new Date(Date.UTC(2020, 0, 3)), amount: 500, isPaid: true },
			{ date: new Date(Date.UTC(2020, 0, 3)), amount: 600, isPaid: true },
		];
		const inputSum = data.reduce((acc, item) => acc + item.amount, 0);
		const output = groupIncome(data);
		const outputSum = output.reduce((acc, item) => acc + item.amount, 0);
		expect(outputSum).toBe(inputSum);
	});
});
