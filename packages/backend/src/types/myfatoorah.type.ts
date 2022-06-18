type MyFatoorahConfigKeys =
  | 'MYFATOORAH_BASE_URL'
  | 'MYFATOORAH_TOKEN'
  | 'MYFATOORAH_CALLBACK_URL';

export type MyFatoorahConfigType = {
  [key in MyFatoorahConfigKeys]: string;
};
