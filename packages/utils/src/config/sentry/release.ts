import type { Config } from '../get-sentry-config';

export const getReleaseName = ({
	PUBLIC_AQARATECH_ENV,
	PUBLIC_COMMIT_SHA,
	repoName,
	version,
}: Config) => {
	if (PUBLIC_AQARATECH_ENV === 'production') {
		return `${repoName}-${version}`;
	} else {
		return PUBLIC_COMMIT_SHA;
	}
};
