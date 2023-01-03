import { toUTCFormatMonthYear } from '@self/utils';

export const generateSchedule = ({
	count,
	amount,
	scheduleStart,
}: {
	count: number;
	amount: number;
	scheduleStart: Date;
}) => {
	const newSchedule = [];
	const start = scheduleStart;
	for (let bp = 0; bp < count; bp++) {
		const postAtMS = Date.UTC(
			start.getUTCFullYear(),
			start.getUTCMonth() + bp,
			start.getUTCDate(),
			start.getUTCHours(),
			start.getUTCMinutes(),
			start.getUTCSeconds(),
		);
		const postAt = new Date(postAtMS).toISOString().substring(0, 10);

		const memo = `Rent for: ${toUTCFormatMonthYear(postAt)}`;

		const id = Math.floor(1000 + Math.random() * 9000).toString();
		newSchedule.push({
			tempid: id,
			amount,
			postAt,
			memo,
		});
	}
	return newSchedule;
};
