type MailConfigKeys = 'USER' | 'PASS' | 'HOST';

export type MailConfigType = {
	[key in MailConfigKeys]: string;
};
