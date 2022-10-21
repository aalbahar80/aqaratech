import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServerClient, TemplatedMessage } from 'postmark';
import { Callback, MessageSendingResponse } from 'postmark/dist/client/models';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';

@Injectable()
export class PostmarkService {
	private readonly logger = new Logger(PostmarkService.name);

	constructor(readonly configService: ConfigService<EnvironmentConfig>) {
		const token = configService.get('mailConfig.POSTMARK_TOKEN', {
			infer: true,
		});

		if (token) {
			this.logger.log('Token detected. Initializing Postmark client.');
			this.postmark = new ServerClient(token);
		} else {
			this.logger.log('No token detected. Postmark client not initialized.');
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
