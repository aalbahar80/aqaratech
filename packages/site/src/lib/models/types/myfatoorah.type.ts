type MyFatoorahConfigKeys =
	| 'MYFATOORAH_BASE_URL'
	| 'MYFATOORAH_TOKEN'
	| 'MYFATOORAH_EMAIL'
	| 'MYFATOORAH_PHONE';

export type MyFatoorahConfigType = {
	[key in MyFatoorahConfigKeys]: string;
};
