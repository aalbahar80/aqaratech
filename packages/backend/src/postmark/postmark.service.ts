import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServerClient, TemplatedMessage } from 'postmark';
import { Callback, MessageSendingResponse } from 'postmark/dist/client/models';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';

@Injectable()
export class PostmarkService extends ServerClient {
	private readonly logger = new Logger(PostmarkService.name);

	constructor(readonly configService: ConfigService<EnvironmentConfig>) {
		const token = configService.get('mailConfig.POSTMARK_TOKEN', {
			infer: true,
		});

		if (!token) {
			throw new Error('Postmark token not found');
		}

		super(token);
	}

	async trySendEmail(
		template: TemplatedMessage,
		callback?: Callback<MessageSendingResponse> | undefined,
	): Promise<MessageSendingResponse | undefined> {
		try {
			// Wrap in a try/catch, otherwise an error here will cause the server to crash
			// when it occurs durring an `@OnEvent` invocation
			return await this.sendEmailWithTemplate(template, callback);
		} catch (error) {
			this.logger.error(error);
		}
	}
}
