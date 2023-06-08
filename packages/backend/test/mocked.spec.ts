import { beforeEach, describe, it, vi } from 'vitest';

import { envSchema } from '@self/utils';

import { bootstrap } from '../src/create-app';

import type { INestApplication } from '@nestjs/common';
import type { TemplatedMessage } from 'postmark';
import type { MessageSendingResponse } from 'postmark/dist/client/models';

vi.mock('@novu/node', () => ({
	Novu: vi.fn().mockImplementation(() => ({
		trigger: vi.fn().mockImplementation(async (arg1, arg2) => {
			console.log('[ MOCK ] - Novu.trigger()');
			console.log(arg1, arg2);
			return await Promise.resolve();
		}),
	})),
}));

vi.mock(
	'tier',
	async (importOriginal: () => Promise<typeof import('tier')>) => {
		const tier = await importOriginal();
		const client = {
			// If orgname is 'no-stub', don't stub the subscription, instead create a real subscription
			subscribe: vi.fn().mockImplementation(async (arg1, arg2, arg3) => {
				console.log('[ MOCK ] - tier.subscribe()');
				const name = arg3?.info?.name as string | undefined;
				if (name?.includes('no-stub')) {
					console.log('[ MOCK ] - tier.subscribe() - not stubbing');
					return await tier.subscribe(arg1, arg2, arg3);
				}
				console.log('[ MOCK ] - tier.subscribe() - stubbing');
				return;
			}),
			// cancel: tier.cancel,
			// report: tier.report,
		};
		return { default: client };
	},
);

vi.mock(
	'postmark',
	async (importOriginal: () => Promise<typeof import('postmark')>) => {
		const ServerClient = vi.fn();
		const token = envSchema
			.pick({
				POSTMARK_TOKEN: true,
			})
			.parse(process.env).POSTMARK_TOKEN;
		const original = new (await importOriginal()).ServerClient(token);

		ServerClient.prototype.sendEmailWithTemplate = vi
			.fn()
			.mockImplementation(async (template: TemplatedMessage) => {
				if (template.To?.endsWith('@aqtest.com')) {
					console.log('[ MOCK ][ UNMOCK ] - postmark.sendEmailWithTemplate()');
					return await original.sendEmailWithTemplate(template);
				} else {
					console.log('[ MOCK ] - postmark.sendEmailWithTemplate()');
					return (await Promise.resolve(
						'stubbed@test.com',
					)) as unknown as MessageSendingResponse;
				}
			});

		ServerClient.prototype.getOutboundMessages = vi
			.fn()
			.mockImplementation(async () => {
				console.log('[ MOCK ] - postmark.getOutboundMessages()');
				return await Promise.resolve([
					{
						MessageID: '648df456-b4ee-40f1-b5ef-00c31b0f8446',
						Status: 'Sent',
						ReceivedAt: '2023-03-03T14:23:59-05:00',
						Recipients: ['test@aqtest.com'],
					},
					{
						MessageID: '935229a3-996f-42d4-9758-a708e604f3c0',
						Status: 'Sent',
						ReceivedAt: '2023-03-03T14:23:59-05:00',
						Recipients: ['org.demo@mailthink.net'],
					},
					{
						MessageID: '800f6c69-ffac-4d6f-bc37-f0f0deddebda',
						Status: 'Sent',
						ReceivedAt: '2023-03-03T13:41:13-05:00',
						Recipients: ['test@aqtest.com', 'john@apple.com'],
					},
				]);
			});

		return { ServerClient };
	},
);

describe('App', () => {
	let app: INestApplication;

	beforeEach(async () => {
		app = await bootstrap();
		await app.listen(3002);
	});

	it('starts with mocked dependencies', () => {
		return new Promise<void>((resolve) => {
			setTimeout(() => {
				resolve();
			}, 1000000000);
		});
	}, 1000000000);
});
