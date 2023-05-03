import { Injectable } from '@nestjs/common';
import { Novu } from '@novu/node';

import { EnvService } from 'src/env/env.service';

@Injectable()
export class NovuService {
	constructor(private readonly env: EnvService) {
		const token = this.env.e.NOVU_TOKEN;
		this.novu = new Novu(token);
	}

	readonly novu: Novu;

	async sendSMS(template: unknown) {
		await this.novu.trigger('sms-direct', {
			to: {
				subscriberId: '<REPLACE_WITH_DATA>',
				phone: '<REPLACE_WITH_DATA>',
			},
			payload: {
				content: '<REPLACE_WITH_DATA>',
			},
		});
	}
}
