import { Injectable } from '@nestjs/common';
import { Novu } from '@novu/node';

import { EnvService } from 'src/env/env.service';

import { SMSTemplate } from './novu.types';

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
}
