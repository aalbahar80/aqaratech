import type { Event, Options } from '@sentry/types';
import type { AqaratechEnv } from '../../../../../types/environment';
import type { Config } from '../get-sentry-config';

/**
 * Environments where we should always send events to Sentry.
 */
const liveEnvs: AqaratechEnv['PUBLIC_AQARATECH_ENV'][] = [
	'production',
	'staging',
];

// TODO: Use typescript `satisfies` directive for return type

/**
 *	 If we are in an environment where we don't usually want to send events, such as `dev`,
 *	 we return a config that helps us filter which events we want to send
 *
 * Otherwise in `prod`/`staging`, we always want to send events, so we don't declare the `beforeSend` key.
 */
export const getSendEventConfig = (
	config: Config,
	helpers: { debug: boolean; sampleRate: number },
): SendEventConfig => {
	if (liveEnvs.includes(config.PUBLIC_AQARATECH_ENV)) {
		return {
			shouldAlwaysSend: true,
		};
	} else if (helpers.debug && helpers.sampleRate > 0) {
		// in dev, we can set debug to true and a sample rate greater than 0 to send events to sentry
		return {
			shouldAlwaysSend: false,
			beforeSend: (event: Event) => {
				console.log('Sentry event', event);
				return event;
			},
		};
	} else {
		// in dev, don't send any events to sentry
		return {
			shouldAlwaysSend: false,
			beforeSend: () => null,
		};
	}
};

type SendEventConfig =
	| {
			shouldAlwaysSend: false;
			beforeSend: NonNullable<Options['beforeSend']>;
	  }
	| {
			shouldAlwaysSend: true;
	  };
