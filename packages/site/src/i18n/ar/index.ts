import { landing } from './landing';

import type { BaseTranslation } from '../i18n-types';

const ar: BaseTranslation = {
	HI: 'مرحبا {name:string}! يرجى ترك نجمة إذا كنت تحب هذا المشروع:',
	log: `هذا السجل تم استدعاؤه من '{fileName:string}'`,
	buttons: {
		login: 'تسجيل الدخول',
		contact: 'اتصل بنا',
	},
	secondaryFeatures: {
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
	},
	landing,
};

export default ar;
