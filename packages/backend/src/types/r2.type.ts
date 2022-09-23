type R2ConfigKeys =
	| 'R2_ACCOUNT_ID'
	| 'R2_ACCESS_KEY_ID'
	| 'R2_SECRET_ACCESS_KEY';

export type R2ConfigType = {
	[key in R2ConfigKeys]: string;
};
