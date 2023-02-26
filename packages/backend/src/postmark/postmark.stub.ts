import { Test } from '@nestjs/testing';
import * as sinon from 'sinon';

import { EnvService } from 'src/env/env.service';

import { PostmarkService } from './postmark.service';

import type { MessageSendingResponse } from 'postmark/dist/client/models';

/** In test (and dev) We don't want to actually subscribe every new org to stripe.
 * For explicitly testing the subscription process, we create subscriptions in the
 *	organization test fixture. */
export async function createStubPostmark() {
	const moduleRef = await Test.createTestingModule({
		providers: [PostmarkService, EnvService],
	}).compile();

	const postmarkService = moduleRef.get<PostmarkService>(PostmarkService);

	const mocked = sinon.createStubInstance<PostmarkService>(PostmarkService);

	mocked.sendEmail.callsFake(async (template) => {
		if (template.To?.endsWith('@aqtest.com')) {
			console.log('not stubbing postmark sendEmail');
			return await postmarkService.sendEmail(template);
		} else {
			console.log('stubbing postmark sendEmail');
			return (await Promise.resolve(
				'stubbed@test.com',
			)) as unknown as MessageSendingResponse;
		}
	});

	return mocked;
}
