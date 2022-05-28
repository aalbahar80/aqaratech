export function getDocs() {
	const branch = import.meta.env.VITE_VERCEL_GIT_COMMIT_REF;
	const env = import.meta.env.VITE_VERCEL_ENV;
	if (env === 'production') {
		return 'https://docs.aqaratech.com';
	} else if (branch === 'stage') {
		return 'https://stage.docs.letand.be';
	} else if (branch === 'dev') {
		return 'https://dev.docs.letand.be';
	} else {
		return 'http://localhost:3001';
	}
}
