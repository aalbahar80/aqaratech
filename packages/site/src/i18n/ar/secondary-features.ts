import type { secondaryFeatures as en_secondaryFeatures } from '../en/secondary-features';

export const secondaryFeatures = {
	managers: {
		summary: 'لمديري العقارات',
		name: 'تسهيل عملياتك',
		description:
			'استخدم أدواتنا القوية لمتابعة جميع ممتلكاتك. تساعدك Aqaratech على تنظيم عملك والعمل بشكل أكثر فعالية.',
	},
	owners: {
		summary: 'للمالكين',
		name: 'رؤية كاملة',
		description:
			'استخدم لوحة القيادة للوصول إلى جميع معلومات ممتلكاتك ومراقبتها، مما يمنحك الراحة ويساعدك على اتخاذ قرارات معلومة.',
	},
	tenants: {
		summary: 'للمستأجرين',
		name: 'إيجارات بدون مشاكل',
		description:
			'تسهل Aqaratech عملية الإيجار بتمكين المستأجرين من تتبع دفعاتهم وعقودهم.',
	},
} satisfies typeof en_secondaryFeatures;
