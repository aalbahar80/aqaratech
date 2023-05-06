import { Injectable } from '@nestjs/common';
import { Novu } from '@novu/node';

import { EnvService } from 'src/env/env.service';
import { MessageTag } from 'src/postmark/tags';

import { SMSTemplate } from './novu.types';

@Injectable()
export class NovuService {
	constructor(private readonly env: EnvService) {
		const token = this.env.e.NOVU_TOKEN;
		this.novu = new Novu(token);
	}

	readonly novu: Novu;

	async sendSMS(tag: MessageTag, template: SMSTemplate) {
		await this.novu.trigger(tag, {
			// TODO: add transactionId to the template
			...template,
			to: {
				subscriberId: template.to.subscriberId,
				phone: '+965' + template.to.phone,
			},
		});
	}
}
