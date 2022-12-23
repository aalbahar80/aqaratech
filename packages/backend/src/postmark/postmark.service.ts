import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ServerClient, TemplatedMessage } from 'postmark';
import { Callback, MessageSendingResponse } from 'postmark/dist/client/models';

import { EnvService } from 'src/env/env.service';

@Injectable()
export class PostmarkService {
	constructor(
		private readonly env: EnvService,
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: LoggerService,
	) {
		const token = this.env.e.POSTMARK_TOKEN;

		if (token) {
			this.logger.log('Token detected. Initializing Postmark client.');
			this.postmark = new ServerClient(token);
		} else {
			this.logger.warn('No token detected. Postmark client not initialized.');
		}
	}

	readonly postmark: ServerClient | undefined;

	async sendEmail(
		template: TemplatedMessage,
		callback?: Callback<MessageSendingResponse> | undefined,
	): Promise<MessageSendingResponse | undefined> {
		try {
			// Wrap in a try/catch, otherwise an error here will cause the server to crash
			// when it occurs durring an `@OnEvent` invocation
			return await this.postmark?.sendEmailWithTemplate(template, callback);
		} catch (error) {
			this.logger.error(error);
			return;
		}
	}
}
