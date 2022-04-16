type MyFatoorahConfigKeys = 'MYFATOORAH_BASE_URL' | 'MYFATOORAH_TOKEN';

export type MyFatoorahConfigType = {
	[key in MyFatoorahConfigKeys]: string;
};
