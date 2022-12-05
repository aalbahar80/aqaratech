import screenshotContacts from '../../../../assets/screenshots/contacts.png';
import screenshotInventory from '../../../../assets/screenshots/inventory.png';
import screenshotProfitLoss from '../../../../assets/screenshots/profit-loss.png';
import HeroiconsArrowTrendingUpSolid from '~icons/heroicons/arrow-trending-up-solid';
import BxsBusiness from '~icons/bxs/business';
import MdiAccount from '~icons/mdi/account';
import MdiAccountTie from '~icons/mdi/account-tie';

export const secondaryFeatures = [
	{
		name: 'Reporting',
		summary: 'Stay on top of things with always up-to-date reporting features.',
		description:
			'We talked about reporting in the section above but we needed three items here, so mentioning it one more time for posterity.',
		image: screenshotProfitLoss,
		icon: HeroiconsArrowTrendingUpSolid,
	},
	{
		name: 'Inventory',
		summary:
			'Never lose track of what’s in stock with accurate inventory tracking.',
		description:
			'We don’t offer this as part of our software but that statement is inarguably true. Accurate inventory tracking would help you for sure.',
		image: screenshotInventory,
		icon: BxsBusiness,
	},
	{
		name: 'Contacts',
		summary:
			'Organize all of your contacts, service providers, and invoices in one place.',
		description:
			'This also isn’t actually a feature, it’s just some friendly advice. We definitely recommend that you do this, you’ll feel really organized and professional.',
		image: screenshotContacts,
		icon: MdiAccount,
	},
];
