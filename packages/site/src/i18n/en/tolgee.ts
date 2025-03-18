export const tolgee = {
	aqaratech: {
		address: {
			line1: 'Kuwait',
			line2: 'Kuwait',
		},
		fullName: 'Aqaratech',
		shortName: 'Aqaratech',
	},
	landing: {
		callToAction: {
			button: 'Create Account',
			description:
				'Start managing your properties with just a few clicks! Sign up now and see the difference.',
			title: 'Get started today',
		},
		faqs: {
			'1': {
				a: 'Aqaratech is a property management platform designed to streamline property management for owners and tenants. It offers dedicated portals for owners and tenants, enabling easy communication, online rent payments, maintenance requests, and expense tracking.',
				q: 'What is Aqaratech?',
			},
			'2': {
				a: 'The owner’s portal provides property owners with a dashboard to manage their properties. Includes features like tenant management, rent collection, expense tracking, maintenance requests, and document storage, all within an easy-to-use interface.',
				q: 'How does the owner’s portal work?',
			},
			'3': {
				a: 'The tenant’s portal allows tenants to view their lease details, submit maintenance requests, communicate with property managers, and pay rent online securely and conveniently.',
				q: 'What features are available in the tenant’s portal?',
			},
			'4': {
				a: 'Aqaratech offers a secure online payment system, allowing tenants to pay rent using various payment methods. Property managers can track payments, generate receipts, and set up automatic reminders for upcoming rent due dates.',
				q: 'How do online rent payments work in Aqaratech?',
			},
			'5': {
				a: 'Tenants can submit maintenance requests directly through their portal by providing details about the issue and attaching any relevant photos. Property managers can then track, prioritize, and resolve these requests within the owner’s portal.',
				q: 'How do tenants submit maintenance requests through Aqaratech?',
			},
			'6': {
				a: 'The expense tracking feature in Aqaratech enables property owners and managers to monitor income and expenses related to their properties. They can categorize expenses, track invoices, and generate customizable financial reports.',
				q: 'How does the expense tracking feature work for property owners?',
			},
			'7': {
				a: 'Yes, Aqaratech offers a mobile friendly interface for both Android and iOS devices, allowing property owners and tenants to access their portals and manage their properties on-the-go.',
				q: 'Is Aqaratech available on mobile devices?',
			},
			'8': {
				a: 'Aqaratech adheres to industry-standard security protocols and data protection regulations to ensure the confidentiality and security of your sensitive information.',
				q: 'How secure is my data with Aqaratech?',
			},
			'9': {
				a: 'Yes, we offer a free trial version for interested users to try the platform features before committing to a subscription. Please contact our sales team for more information on setting up a trial.',
				q: 'Is there a free trial or demo available for Aqaratech?',
			},
			subtitle:
				'If you have any other questions, please feel free to contact us.',
			title: 'Frequently Asked Questions',
		},
		features: {
			data: {
				bullets: {
					monitor: 'Heatmaps tracking of occupancy rates and vacancy periods.',
					track:
						'View property-related information, including leases, maintenance orders, and vacancies.',
					visualize:
						'Interactive dashboards to view income, expenses for each unit.',
				},
				title: 'Analytics Dashboard',
			},
			document: {
				bullets: {
					access:
						'Quickly access your documents from anywhere, using any device.',
					upload: 'Store lease agreements, receipts, and maintenance records.',
				},
				title: 'Document Management',
			},
			expense: {
				bullets: {
					categorize:
						'Classify expenses to offer diverse methods for visualizing expenditure.',
					track: 'Attribute bills to an owner, property or a unit.',
					visualize: 'Visualize expenses using interactive treemaps.',
				},
				title: 'Bill Tracking',
			},
			filter: {
				bullets: {
					customizable:
						'Customizable filters to view the most relevant information.',
					properties: 'Filter properties and units by location.',
					time: 'Filter by specific date ranges or time periods.',
				},
				title: 'Advanced Filtering',
			},
			rental: {
				bullets: {
					reminders: 'Automated payment reminders.',
					track: 'Live tracking of payments transactions.',
				},
				title: 'Payment gateway',
			},
			search: {
				bullets: {
					all: 'Quick search through all information.',
					spell: 'Find information irrespective of spelling inaccuracies.',
				},
				title: 'Powerful Search',
			},
		},
		footer: {
			legal: 'Aqaratech, WLL. All rights reserved.',
		},
		hero: {
			description: 'Access information effortlessly, anytime.',
			subtitle: 'Unique portal to suit the needs of real estate companies.',
			titlePrefix: 'Property management',
			titleHighlight: 'platform.',
			titleSuffix: '',
		},
		location: 'Location',
		map: 'Map',
		pricing: {
			plans: {
				'1': {
					description: '',
					features: {
						'1': 'Online collection',
						'2': 'File storage',
						'3': 'SMS and email notifications',
						'4': 'Auto-reminders',
						'5': 'Multi-beneficiary profiles',
						'6': 'Real-time payment tracking',
						'7': 'Flexible payments for tenants',
						'8': 'Auto settlements & reconciliation',
					},
					name: 'Essential',
					price: '$1.5',
				},
				'2': {
					description: '',
					features: {
						'1': 'Everything in essential plan',
						'2': 'Uploading and classifying expense invoices',
					},
					name: 'Premium',
					price: '$5',
				},
				'3': {
					description: '',
					features: {
						'1': 'Everything in Premium plan',
						'2': 'Dedicated account manager',
					},
					name: 'Inclusive',
					price: 'Contact us',
				},
			},
			subtitle: 'Price is per unit per month.',
			title: 'Pricing',
		},
		secondaryFeatures: {
			managers: {
				description: 'Organize operations and Increase efficiency.',
				name: 'Streamline your workflows',
				summary: 'Real Estate Companies',
			},
			owners: {
				description: 'View property information and categorize expenses.',
				name: 'Complete visibility',
				summary: 'Property Owners',
			},
			tenants: {
				description: 'Online rent payments and maintenance requests.',
				name: 'Resident Center',
				summary: 'Residents',
			},
		},
	},
	misc: {
		contactOrg: 'Please contact your property manager to request access.',
		invoiceSuccess: 'Thank you for your payment.',
		searchByName: 'Search by Name',
		tenantInvoicePage: 'Welcome, view your payment transactions and receipts.',
		tenantLeasePage: 'View related leases and issue maintenance orders.',
		tenantLogin: 'Please log in to view your payment history and receipts.',
		tenantMaintenancePage:
			'Please visit the leases page to open a new maintenance order.',
	},
};

export type Tolgee = typeof tolgee;
