type ApiConfigKeys = 'PUBLIC_API_URL' | 'PUBLIC_API_URL_LOCAL';

export type ApiConfigType = {
	[key in ApiConfigKeys]: string;
};
