import { Injectable } from '@nestjs/common';
import { ServerClient, TemplatedMessage } from 'postmark';

import { EnvService } from 'src/env/env.service';
import { MessageTag } from 'src/postmark/tags';

import { MessageDto } from './message.dto';

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

	async getSentEmails({
		tag,
		leaseInvoiceId,
	}: {
		tag: MessageTag;
		leaseInvoiceId: string;
	}): Promise<MessageDto[]> {
		const sentEmails = await this.postmark.getOutboundMessages({
			tag: tag,
			metadata_leaseInvoiceId: leaseInvoiceId,
		});

		const messages = sentEmails.Messages.map((m) => ({
			id: m.MessageID,
			status: m.Status,
			receivedAt: m.ReceivedAt,
			recipients: m.Recipients,
		})) satisfies MessageDto[];

		return messages;
	}
}
