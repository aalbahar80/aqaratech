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
			plural: 'عقارات',
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
	},
	fields: {
		fullName: 'الاسم الكامل',
		label: 'مسمى',
		dob: 'تاريخ الولادة',
		civilid: 'الهوية المدنية',
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
		isPaid: 'حالة السداد',
		dueAt: 'تاريخ الاستحقاق النهائي',
		paidAt: 'تاريخ الدفع',
		categoryId: 'فئة',
		title: 'لقب',
		description: 'وصف',
		status: 'حالة',
		completedAt: 'أكمل في',
		labelEn: 'مسمى (الإنجليزية)',
		labelAr: 'مسمى (العربية)',
		isGroup: 'مجموعة',
		key: 'اسم',
		fileName: 'اسم الملف',
		size2: 'حجم',
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
	},
	nav: {
		financials: 'البيانات المالية',
		income: 'الدخل',
		charts: 'الرسوم البيانية',
		data: 'بيانات',
		occupancy: 'الإشغال',
		list: 'قائمة',
		settings: 'إعدادات',
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
	},
	charts: {
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
		notYetDue: 'لم يتم الدفع بعد',
		due: 'مستحق',
		overdue: 'متأخر',
		paid: 'مدفوع',

		upcoming: 'قادم',
		current: 'جاري',
		expired: 'منتهي',

		inProgress: 'جاري',
		completed: 'مكتمل',
		cancelled: 'ملغي',
	},
	filter: {
		filters: 'المرشحات',
		start: 'بداية',
		end: 'نهاية',
		range: 'نطاق',
		monthToDate: 'الشهر الحالي',
		last3Months: 'آخر 3 أشهر',
		last6Months: 'آخر 6 أشهر',
		last12Months: 'آخر 12 شهر',
		custom: 'مخصص',
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
		title: 'ابحث عن مستأجرين، ملاك، أو عقارات.',
		subtitle: 'ابحث بالاسم، العنوان، إلخ',
		noResults: 'لا توجد نتائج',
	},
	landing: {
		hero: {
			titlePrefix: 'قم بإدارة عقاراتك',
			titleSuffix: 'بكل سهولة.',
			subtitle: 'إدارة العقارات بشكل مبسط.',
			description:
				'يوفر Aqaratech منصة شاملة وسهلة الاستخدام حيث يمكنك إدارة خصائص متعددة ، وتتبع المهام المهمة والمواعيد النهائية، والوصول بسرعة إلى معلومات مهمة-كل ذلك في مكان واحد.',
		},
		features: {
			data: {
				title: 'البيانات والتحليلات',
				bullets: {
					track:
						'تتبع شامل للبيانات المتعلقة بالممتلكات، بما في ذلك الوحدات وعقود الإيجار والمستأجرين والمزيد.',
					visualize:
						'تصور البيانات المالية لخصائصك لتحديد الاتجاهات والأنماط مع مرور الوقت.استخدم لوحات المعلومات التفاعلية لدينا لعرض الدخل والنفقات والربح/الخسارة لكل محفظة وممتلكات ووحدة.',
					monitor:
						'راقب معدلات إشغال عقاراتك وفترات الشغور باستخدام خرائط الحرارة.',
				},
			},
			rental: {
				title: 'تتبع مدفوعات الإيجار',
				bullets: {
					track: 'سهولة تتبع وإدارة مدفوعات الإيجار واتفاقيات الإيجار.',
					reminders: 'تذكير الدفع الآلي.',
				},
			},
			expense: {
				title: 'تتبع النفقات بطريقة مرئية',
				bullets: {
					track:
						'يوفر لك تتبع النفقات الشامل تفريغًا قيمة لتحليل النفقات.اختر أن تنسب النفقات إلى محفظة أو عقار أو حتى وحدة واحدة.',
					categorize:
						'قم بتصنيف النفقات باستخدام نظام هرمي لفهم مصادر النفقات بشكل أفضل.',
					visualize:
						'تصور النفقات باستخدام Treemaps التفاعلية ، والتي تسمح لك بتحديد أنماط التكلفة بسرعة.',
				},
			},
			filter: {
				title: 'تصفية متقدمة',
				bullets: {
					customizable:
						'المرشحات القابلة للتخصيص ، حتى تتمكن من التركيز على المعلومات الأكثر صلة بك.',
					properties:
						'قم بتصفية خصائصك وبيانات المستأجرين حسب الموقع ، بما في ذلك الخصائص أو الوحدات المحددة داخل العقارات.',
					time: 'تصفية حسب الوقت ، بما في ذلك نطاقات زمنية أو فترات زمنية محددة.',
				},
			},
			document: {
				title: 'إدارة المستندات',
				bullets: {
					upload:
						'قم بتخزين وإدارة المستندات المهمة المتعلقة بالممتلكات والمستأجرين ، بما في ذلك عقود الإيجار وإيصالات دفع الإيجار وسجلات الصيانة.',
					access: 'يمكنك الوصول إلى مستنداتك من أي مكان باستخدام أي جهاز.',
				},
			},
			search: {
				title: 'بحث قوي',
				bullets: {
					all: 'ابحث في جميع بياناتك في في آن واحد.',
					spell: 'اعثر على ما تبحث عنه دون معرفة التهجئة الدقيقة.',
				},
			},
		},
		secondaryFeatures: {
			managers: {
				summary: 'لمديري العقارات',
				name: 'قم بتبسيط عمليات سير العمل',
				description:
					'استفد من أدواتنا القوية لتتبع جميع ممتلكاتك. تساعدك عقاراتك على تنظيم عملك والعمل بكفاءة أكبر.',
			},
			owners: {
				summary: 'لأصحاب العقارات',
				name: 'رؤية كاملة',
				description:
					'استخدم لوحة التحكم الخاصة بنا للوصول إلى جميع معلومات الممتلكات الخاصة بك ومراقبتها، مما يمنحك راحة البال لمساعدتك على اتخاذ قرارات مستنيرة.',
			},
			tenants: {
				summary: 'للمستأجرين',
				name: 'إيجارات خالية من المتاعب',
				description:
					'تبسط عقاراتك عملية الإيجار من خلال السماح للمستأجرين بتتبع مدفوعاتهم وعقود الإيجار.',
			},
		},
		callToAction: {
			title: 'ابدأ اليوم',
			description:
				'جرب AQARATECH وتجربة سهولة وراحة إدارة العقارات الخاصة بك ببضع نقرات فقط!اشترك الآن وشاهد الفرق الذي يمكن أن يحدثه لعملك.',
			button: 'إنشاء حساب',
		},
		footer: {
			legal:
				'شركة عقاراتك لإدارة وتطوير الأراضي والعقارات. جميع الحقوق محفوظة.',
		},
		location: 'موقع',
		online: 'متصل',
		map: 'خريطة',
	},
	aqaratech: {
		fullName: 'شركة عقاراتك لإدارة وتطوير الأراضي والعقارات',
		shortName: 'عقاراتك',
		address: {
			line1: 'شارع الشهداء، مبنى سليمان',
			line2: 'الشرق، 15305، الكويت',
		},
	},
	other: {
		progress: 'المدة المنقضية',
		vacancy: 'حالة الإيجار',
		vacant: 'شاغر',
		occupied: 'مستأجر',
		areYouSure: 'هل انت متاكد؟',
	},
};

export default ar;
