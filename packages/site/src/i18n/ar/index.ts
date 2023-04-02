/* eslint-disable */
import type { Translation } from '../i18n-types';

const ar: Translation = {
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
			plural: 'المستأجرين',
			singular: 'مستأجر',
		},
		portfolio: {
			plural: 'الملاك',
			singular: 'مالك',
		},
		property: {
			plural: 'العقارات',
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
			plural: 'اعمال الصيانة',
			singular: 'عمل صيانة',
		},
		payout: {
			plural: 'المدفوعات',
			singular: 'المدفوعات',
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
		net: 'صافي',
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
		uncollected: 'غير المحصل',
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
		overdue: 'متأخر',
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
		start: 'بداية',
		end: 'نهاية',
		range: 'نطاق',
		monthToDate: 'الشهر الحالي',
		last3Months: 'آخر 3 أشهر',
		last6Months: 'آخر 6 أشهر',
		last12Months: 'آخر 12 شهر',
		custom: 'مخصص',
		isPaidLate: 'وقت السداد',
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
	landing: {
		callToAction: {
			button: 'إنشاء حساب',
			description: 'منصة عقاراتك تمنحك تجربة سهلة ومريحة لإدارة العقار.',
			title: 'اِبدأ بالتسجيل',
		},
		features: {
			data: {
				bullets: {
					monitor:
						'بإمكانك مراقبة معدلات إشغال العقار وفترات الشغور باستخدام التمثيل البياني للخرائط الحرارية.',
					track:
						'بإمكانك إجراء تتبع شامل للبيانات المتعلقة بالعقار، بما في ذلك الوحدات العقارية وعقود الإيجار والمستأجرين وغيرها الكثير.',
					visualize:
						'بإمكانك إعداد تمثيل بياني للبيانات المالية الخاصة بالعقار، مما يتيح لك تحديد التوجّهات والأنماط بمرور الوقت. باستخدامك لوحة البيانات، يمكنك معاينة انواع الدخل والمصاريف والأرباح/الخسائر لكل محفظة وعقار.',
				},
				title: 'تحليل البيانات',
			},
			document: {
				bullets: {
					access: 'بإمكانك الوصول إلى الوثائق من أي مكان وباستخدام أي جهاز.',
					upload:
						'بإمكانك تخزين الوثائق المهمة المتعلقة بالعقار وبالمستأجرين، بما فيها عقود الإيجار وإيصالات دفع الإيجار وسجلات الصيانة، ونُتيح لك إدارة تلك الوثائق.',
				},
				title: 'إدارة المستندات والوثائق',
			},
			expense: {
				bullets: {
					categorize:
						'بإمكانك تبويب المصاريف وتصنيفها وفق نظام هرمي يمكّنك من معرفة مصادر المصاريف على نحوٍ أفضل.',
					track:
						'ميزة التتبع الشامل للمصاريف تتيح لك تجميع بيانات مفصّلة وقيّمة تساعدك في عملية تحليل المصاريف. ويمكنك اختيار إحالة المصاريف إلى محفظة أو عقار أو حتى وحدة سكنية بحد ذاتها.',
					visualize:
						'بإمكانك إعداد تمثيل بياني المصاريف باستخدام مخططات هيكلية تفاعلية، مما يتيح لك معرفة أنماط التكاليف.',
				},
				title: 'تتبع لمصاريف الوحدات العقارية وتمثيلها بيانيّاً',
			},
			filter: {
				bullets: {
					customizable:
						'بإمكانك استخدام ميزة التصنيف للتركيز على المعلومات الأنسب بالنسبة لك.',
					properties:
						'بإمكانك تصنيف العقار وبيانات المستأجرين حسب الموقع، بما في ذلك عقارات أو وحدات معيّنة ضمن العقار.',
					time: 'بإمكانك التصنيف حسب الوقت، بما في ذلك التصنيف حسب النطاقات الزمنية المحددة أو حسب الفترات الزمينة.',
				},
				title: 'ميزة التصنيف المتقدم',
			},
			rental: {
				bullets: {
					reminders: 'ميزة التنبيهات التلقائية للتحصيلات.',
					track: 'سهولة في تتبع تحصيل الإيجار وعقود الإيجار.',
				},
				title: 'ميزة تتبع تحصيل الإيجار',
			},
			search: {
				bullets: {
					all: 'ميزة البحث على جميع البيانات الخاصة وتصفُّحها في نفس الوقت.',
					spell:
						'بإمكانك العثور على ما تبحث عنه حتى لو لم تكن تعرف التهجئة الدقيقة لمفردات البحث.',
				},
				title: 'البحث الدقيق',
			},
		},
		footer: {
			legal: 'شركة عقاراتك، ذ. م. م.، كافة الحقوق محفوظة.',
		},
		hero: {
			description:
				'توفر لك منصة "عقاراتك" وسيلة شاملة وسهلة الاستخدام، تمكنك بإدارة العقار وتتبع العمليات و الوصول السريع إلى المعلومات المهمة.\n',
			subtitle: 'سهولة إدارة العقار.',
			titlePrefix: 'منصة شاملة',
			titleSuffix: 'لإدارة العقار.',
		},
		location: 'الموقع',
		map: 'الخريطة',
		secondaryFeatures: {
			managers: {
				description:
					'تساعدك منصة عقاراتك على تتبع جميع الوحدات العقارية و تنظيم العمليات.',
				name: 'تتبع سير العمل بسهولة. ',
				summary: 'لمديري العقار',
			},
			owners: {
				description:
					'بإمكانك استخدام لوحة التحكم للوصول إلى المعلومات الخاصة بالوحدات العقارية ومراقبتها مما يساعدك على اتخاذ القرارات.',
				name: 'رؤية شاملة',
				summary: 'لأصحاب العقار',
			},
			tenants: {
				description:
					'توفر منصة عقاراتك سهولة في معاملة الإيجار، مما يتيح للمستأجر تتبع مدفوعاته وعقود الإيجار والصيانة.',
				name: 'لا مشاكل في معاملات الإيجار.',
				summary: 'للمستأجرين',
			},
		},
	},
	aqaratech: {
		address: {
			line1: '25 شارع الشهداء، برج سليمان',
			line2: '15305 منطقة شرق، الكويت',
		},
		fullName: 'شركة عقاراتك، ذ. م. م.',
		shortName: 'عقاراتك',
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
	},
};

export default ar;
