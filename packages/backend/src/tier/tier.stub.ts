import { Test } from '@nestjs/testing';
import * as sinon from 'sinon';

import { EnvService } from 'src/env/env.service';

import { TierService } from './tier.service';

/** In test (and dev) We don't want to actually subscribe every new org to stripe.
 * For explicitly testing the subscription process, we create subscriptions in the
 *	organization test fixture. */
export async function createStubTier() {
	const moduleRef = await Test.createTestingModule({
		providers: [TierService, EnvService],
	}).compile();

	const realTierService = moduleRef.get<TierService>(TierService);

	const mocked = sinon.createStubInstance<TierService>(TierService);

	// if orgname is 'no-stub', don't stub the subscription, instead
	// create a real subscription
	mocked.subscribe.callsFake(async ({ organization, user }) => {
		if (organization.fullName.includes('no-stub')) {
			console.log('not stubbing subscription');
			return await realTierService.subscribe({ organization, user });
		}
		console.log('stubbing subscription');
	});

	return mocked;
}
