import type { Config } from '../get-sentry-config';

export const getReleaseName = ({
	PUBLIC_AQARATECH_ENV,
	commitSha,
	repoName,
	version,
}: Config) => {
	if (PUBLIC_AQARATECH_ENV === 'production') {
		return `${repoName}-${version}`;
	} else {
		return commitSha;
	}
};
