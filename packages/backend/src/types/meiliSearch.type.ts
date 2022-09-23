type MeiliSearchConfigKeys = 'HOST' | 'API_KEY';

export type MeiliSearchConfigType = {
	[key in MeiliSearchConfigKeys]: string;
};
