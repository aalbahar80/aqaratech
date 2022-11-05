import { startOfMonthN } from '@self/utils';

/**
 * The default `start` date to use for Summary Stats.
 *
 * Typically, we only want the last 3 months.
 */
export const rangeStart = startOfMonthN(2).slice(0, 10);
