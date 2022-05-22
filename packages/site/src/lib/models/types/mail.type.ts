type MailConfigKeys = 'POSTMARK_TOKEN';

export type MailConfigType = {
	[key in MailConfigKeys]: string;
};
