import { OutboundMessage } from 'postmark/dist/client/models';

export class MessageDto {
	id: OutboundMessage['MessageID'];
	status: OutboundMessage['Status'];
	recipients: OutboundMessage['Recipients'];
	receivedAt: OutboundMessage['ReceivedAt'];
}
