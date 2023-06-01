/* eslint-disable */
import type { Translation } from '../i18n-types';
import { tolgee } from './tolgee';

const ar: Translation = {
	...tolgee,
	entity: {
		user: {
			plural: 'المستخدمين',
			singular: 'مستخدم',
		},
		organization: {
			plural: 'المنظمات',
			singular: 'منظمة',
		},
		role: {
			plural: 'الأدوار',
			singular: 'دور',
		},
		tenant: {
			plural: 'العملاء',
			singular: 'عميل',
		},
		portfolio: {
			plural: 'الملاك',
			singular: 'مالك',
		},
		property: {
			plural: 'العقار',
			singular: 'عقار',
		},
		unit: {
			plural: 'الوحدات',
			singular: 'وحدة',
		},
		lease: {
			plural: 'عقود الإيجار',
			singular: 'عقد الإيجار',
		},
		leaseInvoice: {
			plural: 'الفواتير',
			singular: 'فاتورة',
		},
		maintenanceOrder: {
			plural: 'طلبات الصيانة',
			singular: 'طلب صيانة',
		},
		payout: {
			plural: 'التحويلات',
			singular: 'تحويل',
		},
		expense: {
			plural: 'المصروفات',
			singular: 'مصروف',
		},
		expenseCategory: {
			plural: 'فئات المصاريف',
			singular: 'فئة المصاريف',
		},
		file: {
			plural: 'الملفات',
			singular: 'ملف',
		},
		message: {
			plural: 'الرسائل',
			singular: 'رسالة',
		},
	},
	fields: {
		id: 'المعرف',
		fullName: 'الاسم الكامل',
		label: 'مسمى',
		dob: 'تاريخ الولادة',
		civilid: 'الرقم المدني',
		phone: 'رقم الهاتف',
		email: 'عنوان البريد الإلكتروني',
		memo: 'مذكرة',
		amount: 'مبلغ',
		createdAt: 'تاريخ الإنشاء',
		updatedAt: 'تاريخ التحديث',
		postAt: 'تاريخ الاستحقاق',
		passportNum: 'رقم جواز السفر',
		residencyNum: 'رقم الإقامة',
		residencyEnd: 'تاريخ انتهاء الإقامة',
		nationality: 'جنسية',
		block: 'قطعة',
		street: 'شارع',
		avenue: 'جاده',
		number: 'رقم المبنى',
		paci: 'paci',
		parcel: 'parcel',
		size: 'مساحة',
		type: 'نوع',
		unitNumber: 'رقم الوحدة',
		floor: 'طابق',
		bed: 'غرف نوم',
		bath: 'دورات المياه',
		area: 'منطقة',
		usage: 'الاستخدام',
		marketRent: 'الإيجار السوقي',
		monthlyRent: 'الإيجار الشهري',
		deposit: 'إيداع',
		start: 'بداية',
		end: 'نهاية',
		notify: 'إرسال تذكيرات الدفع',
		canPay: 'السماح للمستأجر بدفع الفواتير عبر الإنترنت',
		tenantId: 'مستأجر',
		license: 'رخصة',
		isPaid: 'مدفوع',
		dueAt: 'تاريخ الاستحقاق النهائي',
		dueDuration: 'مدة الاستحقاق',
		dueDurationMonths: 'مدة الاستحقاق (شهور)',
		dueDurationDays: 'مدة الاستحقاق (أيام)',
		paidAt: 'تاريخ الدفع',
		categoryId: 'فئة',
		title: 'العنوان',
		description: 'وصف',
		status: 'حالة',
		completedAt: 'تاريخ الإتمام',
		labelEn: 'مسمى (الإنجليزية)',
		labelAr: 'مسمى (العربية)',
		isGroup: 'مجموعة',
		key: 'اسم',
		fileName: 'اسم الملف',
		size2: 'حجم',
		receivedAt: 'تاريخ الإستلام',
		recipients: 'المستلمين',
		mfPaymentId: 'معرف سداد ماي فاتورة',
	},
	buttons: {
		login: 'تسجيل الدخول',
		logout: 'تسجيل الخروج',
		contact: 'تواصل معنا',
		search: 'بحث',
		edit: 'تعديل',
		new: 'إضافة',
		save: 'حفظ',
		cancel: 'إلغاء',
		delete: 'حذف',
		export: 'تحميل',
		close: 'إلغاء',
		addMultiple: 'إضافة متعددة',
		view: 'عرض',
		toggleAll: 'عرض الكل',
		markAsPaid: 'تم الدفع',
		options: 'خيارات',
		renew: 'تجديد',
		contract: 'عقد',
		print: 'طباعة',
		sendReminder: 'إرسال تذكير',
		sendInvite: 'إرسال دعوة',
		pay: 'دفع',
		copyPayLink: 'نسخ رابط الدفع',
		back: 'عودة',
		subscribe: 'اشترك',
		signup: 'إنشاء حساب ',
		fileInput: 'اختر ملف',
	},
	billing: {
		subscriptionSettings: 'إعدادات الاشتراك',
		activateNewSubscription: 'تفعيل اشتراك جديد',
		viewInvoices: 'عرض الفواتير',
		updatePaymentMethod: 'تحديث طريقة الدفع',
		cancelSubscription: 'إلغاء الاشتراك',
		cancelSubscriptionImmediately: 'قم بإلغاء اشتراكك على الفور',
	},
	nav: {
		financials: 'البيانات المالية',
		income: 'الدخل',
		charts: 'الرسوم البيانية',
		data: 'بيانات',
		occupancy: 'الإشغال',
		list: 'قائمة',
		settings: 'إعدادات',
		billing: 'الاشتراك',
		account: 'حساب',
		info: 'تفاصيل',
		net: 'صافي الدخل',
		features: 'مميزات',
		pricing: 'التسعير',
		faq: 'أسئلة متكررة',
		start: 'ابدأ',
		accountingPortal: 'كشف الحساب',
	},
	general: {
		name: 'الاسم',
		phone: 'هاتف',
		email: 'بريد إلكتروني',
		paymentSchedule: 'جدول الدفع',
		balance: 'الرصيد',
		details: 'تفاصيل',
		columns: 'الحقول',
		all: 'الجميع',
		total: 'إجمالي',
		forPeriod: 'للفترة',
		collected: 'المحصل',
		uncollected: 'الغير محصل',
		unspecified: 'غير محدد',
		thisMonth: 'الشهر الحالي',
		lastMonth: 'الشهر الماضى',
		noItems: 'لا توجد بيانات يمكن عرضها.',
		paymentMethod: 'طريقة الدفع',
		online: 'عبر الإنترنت',
		manual: 'يدوي',
		late: 'متأخر',
		notLate: 'غير متأخر',
		months: 'أشهر',
		days: 'أيام',
	},
	charts: {
		empty: {
			title: 'لا توجد بيانات',
			// subtitle: 'لا توجد بيانات متاحة للتحديد الخاص بك.',
		},
		incomePie: {
			title: 'الدخل: حسب حالة الدفع',
			subtitle: 'إجمالي الدخل حسب حالة الدفع للفترة المحددة.',
		},
		incomeBar: {
			title: 'الدخل: حسب الشهر',
			subtitle: 'إجمالي الدخل حسب الشهر للفترة المحددة.',
		},
		occupancyHeatmap: {
			title: 'الإشغال',
			subtitle: 'نسبة الوحدات المؤجرة.',
			previous: 'الفترة الماضية',
			next: 'الفترة القادمة',
		},
		expensesBar: {
			title: 'المصروفات: حسب الشهر',
			subtitle: 'إجمالي المصروفات حسب الشهر للفترة المحددة.',
		},
		expensesLocationTreeMap: {
			title: 'المصروفات: حسب الموقع',
			subtitle: 'إجمالي المصروفات حسب الموقع للفترة المحددة.',
			subtitle2: ' اضغط على البلاط للتكبير. حجم البلاط متناسب مع حجم المبلغ.',
		},
		expensesCategoryTreeMap: {
			title: 'المصروفات: حسب الفئة',
			subtitle: 'إجمالي المصروفات حسب الفئة للفترة المحددة.',
			subtitle2: ' اضغط على البلاط للتكبير. حجم البلاط متناسب مع حجم المبلغ.',
		},
	},
	badge: {
		notYetDue: 'لم يحن وقت السداد',
		due: 'مستحق',
		overdue: 'تجاوز موعد الاستحقاق',
		paid: 'مدفوع',
		unpaid: 'غير مدفوع',

		onTime: 'في الوقت المحدد',
		late: 'متأخر',
		advanced: 'مسبق',

		upcoming: 'قادم',
		current: 'جاري',
		expired: 'منتهي',
		expiry: 'انتهاء',

		inProgress: 'جاري',
		completed: 'متمم',
		cancelled: 'ملغي',
	},
	filter: {
		filters: 'تصفية',
		start: 'بداية الفترة',
		end: 'نهاية الفترة',
		range: 'اختر النطاق',
		rangeKind: 'تصفية حسب',
		monthToDate: 'الشهر الحالي',
		last3Months: 'آخر 3 أشهر',
		last6Months: 'آخر 6 أشهر',
		last12Months: 'آخر 12 شهر',
		custom: 'مخصص',
		payPhase: 'وقت السداد',
	},
	pagination: {
		next: 'التالي',
		previous: 'سابق',
		showing: 'عرض',
		show: 'عرض',
		to: 'إلى',
		of: 'من',
		page: 'صفحة',
	},
	search: {
		titlePrefix: 'ابحث عن',
		// title: 'ابحث عن مستأجرين، ملاك، أو عقارات.',
		subtitle: 'ابحث بالاسم، العنوان، إلخ',
		noResults: 'لا توجد نتائج',
	},
	other: {
		progress: 'المدة المنقضية',
		vacancy: 'حالة الإيجار',
		vacant: 'شاغر',
		occupied: 'مستأجر',
		areYouSure: 'هل انت متاكد؟',
		customUnitLabel: 'لعرض قيمة مخصصة ، استخدم حقل التسمية.',
		dueDurationLabel:
			'حدد مدة لاستحقاق لجميع الفواتير. يمكن تعيين المدة بعدد الأشهر أو الأيام (أو كليهما).\n\nيتم استخدام مدة الاستحقاق لتحديد متى يتم اعتبار السداد متأخرًا.',
		unspecifiedUnit: 'وحدة غير محددة',
		unspecifiedProperty: 'عقار غير محدد',
		typeMore: 'اكتب بضعة أحرف أخرى',
		invoiceId: 'رقم الفاتورة',
		iAmA: 'أنا',
		chooseRole: 'اختر نوع المستخدم',
		welcomeToAqaratech: 'مرحبًا بك في عقاراتك',
		revenue: 'إجمالي الدخل',
		accountType: 'نوع الحساب',
		whatsapp: 'واتساب',
	},
};

export default ar;
