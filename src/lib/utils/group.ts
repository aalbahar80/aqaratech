import type { Transaction } from '@prisma/client';
import { eachMonthOfInterval, closestTo } from 'date-fns';

// function that bins transactions into monthly buckets
export const groupByMonth = (
	transactions: Transaction[],
): {
	date: Date;
	transactions: Transaction[];
}[] => {
	const buckets: {
		date: Date;
		transactions: Transaction[];
	}[] = [];
	eachMonthOfInterval({
		start: transactions[0].postDate,
		end: transactions[transactions.length - 1].postDate,
	}).forEach((date) => {
		const bucket = transactions.filter((t) => {
			return (
				t.postDate.getFullYear() === date.getFullYear() &&
				t.postDate.getMonth() === date.getMonth()
			);
		});
		buckets.push({
			date,
			transactions: bucket,
		});
	});
	return buckets;
};

type IncomeData = {
	date: Date;
	amount: number;
	isPaid: boolean;
};
// sum of all transactions in a bucket
export const sumTransactions = (transactions: IncomeData[]): number => {
	return transactions.reduce((acc, t) => acc + t.amount, 0);
};

// group and sum transactions by month
export const groupSumTransactions = (
	transactions: IncomeData[],
): {
	date: Date;
	// transactions: IncomeData[];
	sum: number;
	// isPaid: boolean;
}[] => {
	const buckets = groupByMonth(transactions);
	return buckets.map((b) => {
		return {
			date: b.date,
			// transactions: b.transactions,
			sum: sumTransactions(b.transactions),
		};
	});
};

// group by isPaid
export const groupByIsPaid = (
	transactions: IncomeData[],
): {
	isPaid: boolean;
	transactions: IncomeData[];
}[] => {
	const buckets: {
		isPaid: boolean;
		transactions: IncomeData[];
	}[] = [];
	transactions.forEach((t) => {
		const bucket = buckets.find((b) => b.isPaid === t.isPaid);
		if (bucket) {
			bucket.transactions.push(t);
		} else {
			buckets.push({
				isPaid: t.isPaid,
				transactions: [t],
			});
		}
	});
	return buckets;
};

// group by isPaid, Month
export const groupByIsPaidMonth = (
	transactions: IncomeData[],
): {
	isPaid: boolean;
	date: Date;
	transactions: IncomeData[];
}[] => {};

// sum of transaction groups by isPaid, Month
export const sumByIsPaidMonth = (
	transactions: IncomeData[],
): {
	isPaid: boolean;
	date: Date;
	sum: number;
}[] => {
	const buckets = groupByIsPaidMonth(transactions);
	return buckets.map((b) => {
		return {
			isPaid: b.isPaid,
			date: b.date,
			sum: sumTransactions(b.transactions),
		};
	});
};
