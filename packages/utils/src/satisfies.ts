import type { F } from 'ts-toolbelt';

export const satisfies =
	<TWide>() =>
	<TNarrow extends TWide>(narrow: F.Narrow<TNarrow>) =>
		narrow;
