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

	mocked.getSentEmails.callsFake(async () => {
		console.log('stubbing postmark getSentEmails');
		return await Promise.resolve(
			[
				{
					id: '648df456-b4ee-40f1-b5ef-00c31b0f8446',
					status: 'Sent',
					receivedAt: '2023-03-03T14:23:59-05:00',
					recipients: ['test@aqtest.com'],
				},
				{
					id: '935229a3-996f-42d4-9758-a708e604f3c0',
					status: 'Sent',
					receivedAt: '2023-03-03T14:23:59-05:00',
					recipients: ['org.demo@mailthink.net'],
				},
				{
					id: '800f6c69-ffac-4d6f-bc37-f0f0deddebda',
					status: 'Sent',
					receivedAt: '2023-03-03T13:41:13-05:00',
					recipients: ['test@aqtest.com', 'john@apple.com'],
				},
			],

			// {
			// TotalCount: 3,
			// Messages: [
			// 	{
			// 		Tag: 'INVOICE_REMINDER',
			// 		MessageID: '648df456-b4ee-40f1-b5ef-00c31b0f8446',
			// 		MessageStream: 'outbound',
			// 		To: [{ Email: 'test@aqtest.com', Name: '' }],
			// 		Cc: [],
			// 		Bcc: [],
			// 		Recipients: ['test@aqtest.com'],
			// 		ReceivedAt: '2023-03-03T14:23:59-05:00',
			// 		From: '"Aqaratech" <notifications@aqaratech.com>',
			// 		Subject: '[Aqaratech] Your August 2021 rent invoice is available',
			// 		Attachments: [],
			// 		Status: 'Sent',
			// 		TrackOpens: true,
			// 		TrackLinks: 'HtmlAndText',
			// 		Metadata: {
			// 			organizationId: 'f79a7bd6-698b-4b56-9e86-4338690a7929',
			// 			leaseInvoiceId: '3e037bfc-1f40-46c0-a97c-1a7274afd7de',
			// 		},
			// 		Sandboxed: true,
			// 	},
			// 	{
			// 		Tag: 'INVOICE_REMINDER',
			// 		MessageID: '935229a3-996f-42d4-9758-a708e604f3c0',
			// 		MessageStream: 'outbound',
			// 		To: [{ Email: 'org.demo@mailthink.net', Name: '' }],
			// 		Cc: [],
			// 		Bcc: [],
			// 		Recipients: ['org.demo@mailthink.net'],
			// 		ReceivedAt: '2023-03-03T14:23:59-05:00',
			// 		From: '"Aqaratech" <notifications@aqaratech.com>',
			// 		Subject: '[Aqaratech] Your August 2021 rent invoice is available',
			// 		Attachments: [],
			// 		Status: 'Sent',
			// 		TrackOpens: true,
			// 		TrackLinks: 'HtmlAndText',
			// 		Metadata: {
			// 			organizationId: 'f79a7bd6-698b-4b56-9e86-4338690a7929',
			// 			leaseInvoiceId: '3e037bfc-1f40-46c0-a97c-1a7274afd7de',
			// 		},
			// 		Sandboxed: true,
			// 	},
			// 	{
			// 		Tag: 'INVOICE_REMINDER',
			// 		MessageID: '800f6c69-ffac-4d6f-bc37-f0f0deddebda',
			// 		MessageStream: 'outbound',
			// 		To: [{ Email: 'test@aqtest.com', Name: '' }],
			// 		Cc: [],
			// 		Bcc: [],
			// 		Recipients: ['test@aqtest.com'],
			// 		ReceivedAt: '2023-03-03T13:41:13-05:00',
			// 		From: '"Aqaratech" <notifications@aqaratech.com>',
			// 		Subject: '[Aqaratech] Your August 2021 rent invoice is available',
			// 		Attachments: [],
			// 		Status: 'Sent',
			// 		TrackOpens: true,
			// 		TrackLinks: 'HtmlAndText',
			// 		Metadata: {
			// 			organizationId: 'f79a7bd6-698b-4b56-9e86-4338690a7929',
			// 			leaseInvoiceId: '3e037bfc-1f40-46c0-a97c-1a7274afd7de',
			// 		},
			// 		Sandboxed: true,
			// 	},
			// ],
			// }
		);
	});

	return mocked;
}
