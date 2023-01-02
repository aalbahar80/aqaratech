import { hero } from './hero';

import type { landing as en_landing } from '../en/landing';

export const landing = {
	hero,
	callToAction: {
		title: 'ابدأ اليوم',
		description:
			'جرب Aqaratech واستمتع بسهولة وراحة إدارة ممتلكاتك ببضع نقرات فقط! سجل الآن وشاهد الفرق الذي يمكن أن يجعله لعملك.',
		button: 'إنشاء حساب',
	},
} satisfies typeof en_landing;
