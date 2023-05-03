import { Injectable } from '@nestjs/common';
import { Novu } from '@novu/node';

import { EnvService } from 'src/env/env.service';

import { SMSDirect } from './novu.types';

@Injectable()
export class NovuService {
	constructor(private readonly env: EnvService) {
		const token = this.env.e.NOVU_TOKEN;
		this.novu = new Novu(token);
	}

	readonly novu: Novu;

	async sendSMS(template: SMSDirect) {
		throw new Error('TODO: implementing mock');
		await this.novu.trigger('sms-direct', {
			to: {
				subscriberId: template.to.subscriberId,
				phone: template.to.phone,
			},
			payload: {
				content: template.payload.content,
			},
		});
	}
}
