import { Injectable } from '@nestjs/common';
import { Novu } from '@novu/node';

import { EnvService } from 'src/env/env.service';
import { MessageDto } from 'src/postmark/message.dto';

import { SMSTemplate, messagesResponseSchema } from './novu.types';

@Injectable()
export class NovuService {
	constructor(private readonly env: EnvService) {
		const token = this.env.e.NOVU_TOKEN;
		this.novu = new Novu(token);
	}

	readonly novu: Novu;

	async sendSMS(template: SMSTemplate) {
		await this.novu.trigger(template.tag, {
			// TODO: add transactionId to the template
			payload: template.payload,
			to: {
				subscriberId: template.subscriberId,
				phone: '+965' + template.phone,
			},
		});
	}

	async getMessagesBySubscriber(subscriberId: string) {
		const query = new URLSearchParams({
			subscriberId,
		});
		const baseUrl = 'https://api.novu.co/v1/messages';
		const url = `${baseUrl}?${query.toString()}`;

		const res = await fetch(url, {
			headers: {
				Authorization: `ApiKey ${this.env.e.NOVU_TOKEN}`,
			},
		});

		if (res.status === 404) {
			return []; // No such subscriberId
		} else if (!res.ok) {
			throw new Error('Novu API error', {
				cause: {
					status: res.status,
					statusText: res.statusText,
					url,
				},
			});
		}

		const dataRaw: unknown = await res.json();

		const data = messagesResponseSchema.parse(dataRaw);

		const messages = data.data
			// BUG: https://github.com/novuhq/novu/issues/3581
			// Manually filter until the bug is fixed
			.filter((m) => m.subscriber.subscriberId === subscriberId)
			.map((m) => ({
				id: m.id,
				status: m.status,
				recipients: m.phone ? [m.phone] : [],
				date: m.updatedAt,
			})) satisfies MessageDto[];

		return messages;
	}
}
