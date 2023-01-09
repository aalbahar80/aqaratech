/* eslint-disable */
import type { Translation } from '../i18n-types'

const ar: Translation = {
	entity: {
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
			singular: 'المالك',
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
			plural: 'اعمال صيانة',
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
	buttons: {
		login: 'تسجيل الدخول',
		logout: 'تسجيل خروج',
		contact: 'اتصل بنا',
		search: 'بحث',
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
	},
	general: {
		name: 'الاسم',
	},
	filter: {
		start: 'بداية',
		end: 'نهاية',
		range: 'نطاق',
	},
	landing: {
		hero: {
			titlePrefix: 'قم بإدارة عقاراتك',
			titleSuffix: 'بكل سهولة.',
			subtitle: 'إدارة العقارات بشكل مبسط.',
			description: 'Aqaratech provides a comprehensive, easy-to-use platform where you can manage multiple properties, keep track of important tasks and deadlines, and quickly access important information – all in one place.',
		},
		features: {
			data: {
				title: 'البيانات والتحليلات',
				bullets: {
					track: 'تتبع شامل للبيانات المتعلقة بالممتلكات ، بما في ذلك الوحدات وعقود الإيجار والمستأجرين والمزيد.',
					visualize: "Visualize your properties' financial data to identify trends and patterns over time. Use our interactive dashboards to view income, expenses, and profit/loss for each portfolio, property, and unit.",
					monitor: 'راقب معدلات إشغال عقاراتك وفترات الشغور باستخدام خرائط الحرارة.',
				},
			},
			rental: {
				title: 'تتبع مدفوعات الإيجار',
				bullets: {
					track: 'Easy tracking and management of rental payments and lease agreements.',
					reminders: 'تذكير الدفع الآلي.',
				},
			},
			expense: {
				title: 'تتبع النفقات بطريقة مرئية',
				bullets: {
					track: 'Comprehensive expense tracking provides you with valuable granularity for expense analysis. Choose to attribute expenses to a portfolio, property, or even a single unit.',
					categorize: 'قم بتصنيف النفقات باستخدام نظام هرمي لفهم مصادر النفقات بشكل أفضل.',
					visualize: 'Visualize expenses using interactive treemaps, which allow you to quickly identify your cost patterns.',
				},
			},
			filter: {
				title: 'تصفية متقدمة',
				bullets: {
					customizable: 'Customizable filters, so you can focus on the information that is most relevant to you.',
					properties: 'قم بتصفية خصائصك وبيانات المستأجرين حسب الموقع ، بما في ذلك الخصائص أو الوحدات المحددة داخل العقارات.',
					time: 'تصفية حسب الوقت ، بما في ذلك نطاقات زمنية أو فترات زمنية محددة.',
				},
			},
			document: {
				title: 'إدارة المستندات',
				bullets: {
					upload: 'قم بتخزين وإدارة المستندات المهمة المتعلقة بالممتلكات والمستأجرين ، بما في ذلك عقود الإيجار وإيصالات دفع الإيجار وسجلات الصيانة.',
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
				description: 'استفد من أدواتنا القوية لتتبع جميع ممتلكاتك. تساعدك عقاراتك على تنظيم عملك والعمل بكفاءة أكبر.',
			},
			owners: {
				summary: 'لأصحاب العقارات',
				name: 'رؤية كاملة',
				description: 'استخدم لوحة التحكم الخاصة بنا للوصول إلى جميع معلومات الممتلكات الخاصة بك ومراقبتها، مما يمنحك راحة البال لمساعدتك على اتخاذ قرارات مستنيرة.',
			},
			tenants: {
				summary: 'للمستأجرين',
				name: 'إيجارات خالية من المتاعب',
				description: 'تبسط عقاراتك عملية الإيجار من خلال السماح للمستأجرين بتتبع مدفوعاتهم وعقود الإيجار.',
			},
		},
		callToAction: {
			title: 'ابدأ اليوم',
			description: 'Try Aqaratech and experience the ease and convenience of managing your properties with just a few clicks! Sign up now and see the difference it can make for your business.',
			button: 'إنشاء حساب',
		},
		footer: {
			legal: 'شركة عقاراتك لإدارة وتطوير الأراضي والعقارات. جميع الحقوق محفوظة.',
		},
	},
	aqaratech: {
		fullName: 'شركة عقاراتك لإدارة وتطوير الأراضي والعقارات',
		shortName: 'عقاراتك',
	},
}

export default ar
