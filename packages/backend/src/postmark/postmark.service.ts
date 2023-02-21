import { Injectable } from '@nestjs/common';
import { ServerClient, TemplatedMessage } from 'postmark';

import { EnvService } from 'src/env/env.service';

@Injectable()
export class PostmarkService {
	constructor(private readonly env: EnvService) {
		const token = this.env.e.POSTMARK_TOKEN;
		this.postmark = new ServerClient(token);
	}

	readonly postmark: ServerClient;

	async sendEmail(template: TemplatedMessage) {
		return await this.postmark.sendEmailWithTemplate(template);
	}
}
