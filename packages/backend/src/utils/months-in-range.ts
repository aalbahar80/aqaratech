import Moment from 'moment';
import { extendMoment } from 'moment-range';

export const monthsInRange = (start: string, end: string) => {
	// @ts-expect-error fix moment type
	const moment = extendMoment(Moment);

	const range = moment.range(moment(start), moment(end));

	const months = Array.from(range.by('month')).map((m) => m.format('YYYY-MM'));

	return months;
};
