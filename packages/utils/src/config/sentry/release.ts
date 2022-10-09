import type { Config } from '../get-sentry-config';

export const getReleaseName = ({
	PUBLIC_AQARATECH_ENV,
	commitSha,
	repoName,
	version,
}: Config) => {
	if (PUBLIC_AQARATECH_ENV === 'production') {
		return `${repoName}-${version}`;
	} else if (commitSha) {
		// commit hash should be provided in docker (staging)
		return commitSha;
	} else {
		// this is meant for local development only
		return `${repoName}-${version}-local`;
	}
};
