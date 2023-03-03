import { get } from 'svelte/store';

import { locale } from '$i18n/i18n-svelte';

export const labelHint = () =>
	get(locale) === 'ar'
		? '(اختياري) استخدم تسمية مخصصة للإشارة إلى هذا الكيان.'
		: '(Optional) Use a custom label to refer to this entity.';
