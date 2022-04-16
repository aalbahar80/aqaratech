type TwilioConfigKeys =
	| 'TWILIO_ACCOUNT_SID'
	| 'TWILIO_AUTH_TOKEN'
	| 'TWILIO_FROM_NUMBER';

export type TwilioConfigType = {
	[key in TwilioConfigKeys]: string;
};
