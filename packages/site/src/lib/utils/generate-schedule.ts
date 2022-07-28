import { toUTCFormat } from '$lib/utils/common.js';
import { nanoid } from 'nanoid';

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
	for (let bp = 0; bp < Math.min(count, 24); bp++) {
		const postAtMS = Date.UTC(
			start.getUTCFullYear(),
			start.getUTCMonth() + bp,
			start.getUTCDate(),
			start.getUTCHours(),
			start.getUTCMinutes(),
			start.getUTCSeconds(),
		);
		console.log(new Date(postAtMS), 'postAt');
		const postAt = new Date(postAtMS).toISOString().split('T')[0] as string;
		const memo = `Rent for: ${toUTCFormat(new Date(postAtMS), 'MMMM yyyy')}`;
		newSchedule.push({
			nanoid: nanoid(),
			amount,
			postAt,
			memo,
		});
	}
	return newSchedule;
};
