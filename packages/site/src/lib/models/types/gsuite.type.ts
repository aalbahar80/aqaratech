type GSuiteConfigKeys = 'GSUITE_EMAIL' | 'GSUITE_PASSWORD';

export type GSuiteConfigType = {
	[key in GSuiteConfigKeys]: string;
};
