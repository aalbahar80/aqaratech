import { get } from 'svelte/store';

import { locale } from '$i18n/i18n-svelte';

export const labelHint = () =>
	get(locale) === 'ar'
		? '(اختياري) إذا تم توفير تسمية ، فسيتم استخدامها بدلاً من الاسم الكامل في واجهة المستخدم.'
		: '(Optional) If a label is provided, it will be used instead of the full name in the UI.';
