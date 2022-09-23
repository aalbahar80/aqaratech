import { Module } from '@nestjs/common';
import { PostmarkModule } from 'src/postmark/postmark.module';
import { LeaseInvoicesController } from './lease-invoices.controller';
import { LeaseInvoicesService } from './lease-invoices.service';

@Module({
	controllers: [LeaseInvoicesController],
	providers: [LeaseInvoicesService],
	exports: [LeaseInvoicesService],
	imports: [PostmarkModule],
})
export class LeaseInvoicesModule {}
